import {MainPage} from "./pages/main/index.js";
import { LoadingPage } from "./pages/loading/index.js";
export const root = document.getElementById('root');

export const mainPage = new MainPage(root);
export const loading_page = new LoadingPage();
loading_page.render();
mainPage.render();