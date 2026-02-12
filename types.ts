// Adding definition for the global confetti function loaded via CDN
declare global {
  interface Window {
    confetti: any;
  }
}

export {}; // Ensure this is a module