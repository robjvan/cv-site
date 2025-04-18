import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import { Subject, takeUntil } from 'rxjs';
import { StlViewerService } from '../../../services/stl-viewer.service';
import { BG_WHITE, BG_MED_GREY } from '../../../constants';

@Component({
  selector: 'stlviewer-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './stlviewer-dialog.component.html',
  styleUrl: './stlviewer-dialog.component.scss',
})
export class StlviewerDialogComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly launcherService: LauncherService,
    private readonly stlViewerService: StlViewerService
  ) {}

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.WebGLRenderer;
  private pivot!: THREE.Group;
  private mesh!: THREE.Object3D;

  file: WritableSignal<any | undefined> = signal<any | undefined>(undefined);
  selectedColor: WritableSignal<string | undefined> = signal(undefined);

  ngOnInit() {
    this.stlViewerService.selectedColor$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (colorCode: string) => {
          // Update the currently selected color.
          this.selectedColor.set(colorCode);

          this.init3dView();
        },
        error: (err: any) =>
          console.error('Could not process route params', err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.renderer.dispose();
    this.scene.clear();
  }

  // closeDialog() {
  //   this.launcherService.closeDialog(DialogPurpose.STLVIEWER);
  // }

  /** Initialize the 3D scene and associated content. */
  private init3D(): void {
    console.log('Initializing 3D view...');
    // Create view camera
    this.createCamera();

    // Create initial scene
    this.createInitialScene();

    // Add lights
    this.addLightsToScene();

    // // Add ground plane
    // this.addGroundPlane();

    // Update the pivot point of the 3D object
    this.updateObjectPivotPoint();

    // Add grid to floor plane
    // this.addGridToFloorPlane();

    // Load the STL file
    this.loadStlFile();

    // Set renderer config
    this.setRendererConfig();

    // Add orbit controls
    this.addOrbitControls();

    // Append the new 3D view element
    const div = document.querySelector('#productView');
    div?.appendChild(this.renderer.domElement);
  }

  /** Create initial scene. */
  private createInitialScene() {
    this.scene = new THREE.Scene();
    // if (this.selectedColor() == BLACK) {
    //   this.scene.background = new THREE.Color(BG_GREY);
    //   this.scene.fog = new THREE.Fog(BG_GREY, 4, 20);
    // } else {
    this.scene.background = new THREE.Color(0xff282828);
    this.scene.fog = new THREE.Fog(0xff282828, 4, 20);
    // }
  }

  /** Create view camera. */
  private createCamera() {
    this.camera = new THREE.PerspectiveCamera(45, 5 / 4, 0.1, 100);
    this.camera.position.set(1.5, 1, 1.5);
  }

  /** Add lights to the scene. */
  private addLightsToScene() {
    // Add global illumination
    const hemiLight = new THREE.HemisphereLight(BG_WHITE, BG_MED_GREY, 1);
    hemiLight.position.set(30, 30, 30);
    this.scene.add(hemiLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(BG_WHITE, 2);
    directionalLight.position.set(0, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.bottom = -2;
    directionalLight.shadow.camera.left = -2;
    directionalLight.shadow.camera.right = 2;
    this.scene.add(directionalLight);

    // Add directional light 2
    const directionalLight2 = new THREE.DirectionalLight(BG_WHITE, 1);
    directionalLight2.position.set(20, -30, -30);
    this.scene.add(directionalLight2);

    // Add directional light 3
    const directionalLight3 = new THREE.DirectionalLight(BG_WHITE, 1);
    directionalLight3.position.set(30, 0, 30);
    this.scene.add(directionalLight3);
  }

  // Update the pivot point of the 3D object
  private updateObjectPivotPoint() {
    this.pivot = new THREE.Group();
    this.scene.add(this.pivot);
  }

  /** Load the STL file. */
  private loadStlFile() {
    // Add material
    const material = new THREE.MeshPhongMaterial({
      color: +this.selectedColor()!,
      // color: new THREE.Color(this.selectedColor()!),
    });

    const loader = new STLLoader();
    // console.log(`filename: ${this.product()?.filename}`);
    // loader.load(
    //   `stl/${this.product()?.filename}`,
    //   (geometry) => {
    //     this.mesh = new THREE.Mesh(geometry, material);
    //     this.mesh.castShadow = true;
    //     // this.mesh.position.set(-0.5, 0, 0.5); // offset mesh to rotate around a new pivot point
    //     this.mesh.rotateX(-89.5);
    //     this.mesh.scale.set(0.05, 0.05, 0.05);
    //     this.pivot.add(this.mesh);
    //   },
    //   (xhr) => {
    //     console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    //   },
    //   (error) => {
    //     console.error('Error loading STL file', error);
    //   }
    // );
  }

  /** Set renderer config. */
  private setRendererConfig() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(500, 400);
    // if (this.doAnimate()) {
    //   this.renderer.setAnimationLoop(this.animate.bind(this));
    // } else {
    this.renderer.setAnimationLoop(this.renderStatic.bind(this));
    // }
    this.renderer.shadowMap.enabled = true;
    this.renderer.domElement.style.borderRadius = '16px';
  }

  /** Add orbit controls to the scene. */
  private addOrbitControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
  }

  /** Render static view. */
  private renderStatic = () => {
    if (this.pivot) {
      this.pivot.rotation.y = 0;
    }
    this.renderer.render(this.scene, this.camera);
  };

  /** Draw the 3D view. */
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
}
