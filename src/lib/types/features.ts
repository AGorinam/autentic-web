export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  keyPoints: string[];
  media: {
    desktop: string;
    mobile: string;
  };
}

export type Features = Feature[]; 