import MobileApp from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import PageNavigator from "@web-atoms/web-controls/dist/PageNavigator";
import AppMenu from "./menu/AppMenu";
import HomePage from "./pages/home/Home";
import WebApp from "@web-atoms/core/dist/web/WebApp";

import "./styles/GlobalStyle";

export default class AppIndex extends MobileApp {

    public async init() {

        (this.app as WebApp).installStyleSheet("/node_modules/@fortawesome/fontawesome-free/css/all.min.css");

        this.drawer = AppMenu;

        PageNavigator.openPage(HomePage);
        
    }

}
