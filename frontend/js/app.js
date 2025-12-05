class App {
  constructor() {
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadData();
  }

  setupEventListeners() {
    document
      .getElementById("refreshBtn")
      .addEventListener("click", () => this.refresh());
  }

  async loadData() {
    try {
      UI.showLoading();
      const movies = await API.fetchMovies();
      UI.updateStats(movies);
    } catch (error) {
      UI.showError(error.message);
    }
  }

  async refresh() {
    await API.refreshPlots();
    await this.loadData();
    UI.showSuccess("Data refreshed!");
  }
}

document.addEventListener("DOMContentLoaded", () => new App());
