import MobileApp from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import PageNavigator from "@web-atoms/web-controls/dist/PageNavigator";
import AppMenu from "./menu/AppMenu";
import HomePage from "./pages/home/Home";
import WebApp from "@web-atoms/core/dist/web/WebApp";

import "./styles/GlobalStyle";

export default class AppIndex extends MobileApp {

    public async init() {

        (this.app as WebApp).installStyleSheet({
            href: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",
            integrity: "sha256-HtsXJanqjKTc8vVQjO4YMhiqFoXkfBsjBWcX91T1jr8=",
            crossOrigin: "anonymous"
        });

        this.drawer = AppMenu;

        PageNavigator.openPage(HomePage);
        
    }

}
