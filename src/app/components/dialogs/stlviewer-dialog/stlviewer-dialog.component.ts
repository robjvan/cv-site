import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { StlViewerService } from '../../../services/stl-viewer.service';
import { BG_WHITE, BG_MED_GREY } from '../../../constants';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { IColor } from '../../../models/color.interface';

/**
 * StlviewerDialogComponent renders an interactive 3D preview of STL models using Three.js.
 *
 * The scene is dynamically configured and reloaded based on the selected color.
 * Users can rotate and inspect models with OrbitControls.
 */
@Component({
  selector: 'stlviewer-dialog',
  imports: [DialogWindowComponent, CommonModule],
  templateUrl: './stlviewer-dialog.component.html',
  styleUrl: './stlviewer-dialog.component.scss',
})
export class StlviewerDialogComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  /** Destroy notifier for cleaning up RxJS subscriptions. */
  private destroy$ = new Subject<void>();

  private productViewRef = viewChild<ElementRef>('productView');

  constructor(private readonly stlViewerService: StlViewerService) {}

  /** Three.js core objects for the 3D viewer. */
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private pivot!: THREE.Group;
  private camera!: THREE.PerspectiveCamera; // instead of THREE.Camera
  private mesh!: THREE.Mesh;

  /** Reactive signal for the selected STL file. */
  file: WritableSignal<string | undefined> = signal(undefined);

  /** Reactive signal for currently selected STL model (filename). */
  selectedModel: WritableSignal<string | undefined> = signal(undefined);

  /** Reactive signal for currently selected display color. */
  selectedColor: WritableSignal<string | undefined> = signal(undefined);

  /** Holds our available colors. */
  colors: IColor[] = [];

  /** Holds our available models. */
  modelList: { filename: string; thumb: string }[] = [];

  /**
   * Lifecycle hook — subscribes to color changes and initializes the viewer.
   */
  ngOnInit() {
    this.colors = this.stlViewerService.colors;
    this.modelList = this.stlViewerService.models;

    // Listen to selected color or model updates
    combineLatest([
      this.stlViewerService.selectedColor$,
      this.stlViewerService.selectedModel$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([colorCode, filename]) => {
          console.log(
            'Selected color:',
            colorCode,
            'Selected model:',
            filename
          );
          this.selectedColor.set(colorCode);
          this.selectedModel.set(filename);

          this.init3dView();
        },
        error: (err) =>
          console.error('Could not process model/color selection', err),
      });
  }

  ngAfterViewInit(): void {
    this.init3D();
  }

  /**
   * Cleanup on component destroy.
   * Disposes of Three.js renderer and clears the scene graph.
   */
  ngOnDestroy(): void {
    this.stlViewerService.resetModelAndColor();
    this.destroy$.next();
    this.destroy$.complete();
    this.renderer.dispose();
    this.scene.clear();
  }

  /**
   * Initializes the full 3D scene including camera, lights, controls, and STL loader.
   * Called each time the selectedColor is changed.
   */
  private init3D(): void {
    console.log('Initializing 3D view...');
    this.createCamera();
    this.createInitialScene();
    this.addLightsToScene();
    this.updateObjectPivotPoint();
    this.loadStlFile();
    this.setRendererConfig();
    this.addOrbitControls();

    if (!this.selectedModel() || this.selectedModel() === '') {
      console.warn('No model selected, skipping 3D view initialization');
      return;
    } else {
      this.draw3DView();
    }
  }

  draw3DView() {
    const div = this.productViewRef()?.nativeElement;

    if (div && this.renderer?.domElement) {
      // Prevent double-append
      if (!div.contains(this.renderer.domElement)) {
        div.appendChild(this.renderer.domElement);
      }
    } else {
      console.warn('#productView not found or renderer not ready');
    }
  }

  /** Initializes the scene and sets background color and fog. */
  private createInitialScene() {
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xff2f0f0f0);
    this.scene.background = new THREE.Color(0xff2d0d0d0);
    this.scene.fog = new THREE.Fog(0xff282828, 4, 20);
  }

  /** Creates a PerspectiveCamera with fixed aspect and position. */
  private createCamera() {
    this.camera = new THREE.PerspectiveCamera(45, 5 / 4, 0.1, 100);
    this.camera.position.set(1.5, 1, 1.5);
  }

  /** Adds multiple lights to the scene for proper mesh visibility and shadows. */
  private addLightsToScene() {
    const hemiLight = new THREE.HemisphereLight(BG_WHITE, BG_MED_GREY, 1);
    hemiLight.position.set(30, 30, 30);
    this.scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight(BG_WHITE, 2);
    directionalLight.position.set(0, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.bottom = -2;
    directionalLight.shadow.camera.left = -2;
    directionalLight.shadow.camera.right = 2;
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(BG_WHITE, 1);
    directionalLight2.position.set(20, -30, -30);
    const directionalLight3 = new THREE.DirectionalLight(BG_WHITE, 1);
    directionalLight3.position.set(30, 0, 30);

    this.scene.add(directionalLight2);
    this.scene.add(directionalLight3);
  }

  /** Creates a new pivot group for centering the mesh. */
  private updateObjectPivotPoint() {
    this.pivot = new THREE.Group();
    this.scene.add(this.pivot);
  }

  /**
   * Loads an STL file and adds it to the scene using the selected color.
   * Note: Mesh loading code is commented out for now.
   */
  private loadStlFile() {
    const modelFile = this.selectedModel();

    // Add material
    const colorHex = this.selectedColor()!;

    if (!modelFile || !colorHex) {
      console.warn('Missing model or color selection');
      return;
    }

    const material = new THREE.MeshPhongMaterial({
      color: parseInt(colorHex.replace('#', ''), 16),
    });

    const loader = new STLLoader();
    loader.load(
      modelFile,
      (geometry) => {
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.rotateX(-Math.PI / 2);
        this.mesh.scale.set(0.05, 0.05, 0.05);
        this.pivot.add(this.mesh);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Error loading STL file', error);
      }
    );
  }

  /** Sets up the renderer and attaches it to the DOM. */
  private setRendererConfig() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(500, 400);
    this.renderer.shadowMap.enabled = true;
    this.renderer.domElement.style.borderRadius = '10px';

    // Render a single static frame (no animation loop)
    this.renderer.setAnimationLoop(this.renderStatic.bind(this));
  }

  /** Enables orbit-based camera controls for 3D interaction. */
  private addOrbitControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
  }

  /** Renders a static frame (used instead of animation loop). */
  private renderStatic = () => {
    if (this.pivot) {
      this.pivot.rotation.y = 0;
    }
    this.renderer.render(this.scene, this.camera);
  };

  /**
   * Destroys the existing view and reinitializes it.
   * Triggered when the selected color changes.
   */
  private init3dView(): void {
    // Remove the existing view when changing preview color.
    const div = document.querySelector('#productView');
    if (div?.hasChildNodes) {
      let child = div.firstElementChild;
      if (child) {
        div.removeChild(child!);
      }
    }

    // Dispose of the renderer and scene
    if (this.renderer) {
      this.renderer.setAnimationLoop(null); // stop any existing loop
      this.renderer.dispose();
    }

    if (this.scene) {
      this.scene.clear(); // remove objects from the scene graph
    }

    // Initialize the 3D view.
    this.init3D();
  }

  selectModel(filename: string): void {
    this.stlViewerService.selectModel(filename);
  }

  public isActiveColor(color: IColor) {
    return this.selectedColor() == color.code;
  }

  public selectColor(color: string): void {
    this.stlViewerService.selectColor(color);
  }

  public resetDialog(): void {
    this.stlViewerService.resetModelAndColor();
  }
}
