export interface FlipCardData {
  blurb: string;
  title: string;
  // linkPath: string;
  imgSrc: string;
}

export const flipCardData: FlipCardData[] = [
  {
    title: 'Skills',
    blurb: 'Consequatur architecto alias ea qui modi qui perferendis.',
    // linkPath: '/skills',
    imgSrc: '../../../assets/svg/skills.svg',
  },
  {
    title: 'Projects',
    blurb: 'Minima alias quis voluptatum quisquam totam repellat ipsum eaque.',
    // linkPath: '/projects',
    imgSrc: '../../../assets/svg/coding.svg',
  },
  {
    title: 'Education',
    blurb: 'Minima alias quis voluptatum quisquam totam repellat ipsum eaque.',
    // linkPath: '/skills',
    imgSrc: '../../../assets/svg/certificate.svg',
  },
  {
    title: 'Contact',
    blurb:
      'Corporis ex culpa quia. Molestiae delectus sit provident ratione quas et.',
    // linkPath: '/contact',
    imgSrc: '../../../assets/svg/contact-us.svg',
  },
];
