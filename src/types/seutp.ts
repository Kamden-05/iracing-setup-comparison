export interface SetupItem {
  name: string;
  values: string[];
}

export interface SetupCategory {
  name: string;
  items: SetupItem[];
}

export interface Setup {
  carName: string;
  setupName: string;
  trackName: string;
  categories: SetupCategory[];
}
