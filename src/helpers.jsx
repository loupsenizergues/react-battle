export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function resolveAfter(X) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, X);
    });
  }