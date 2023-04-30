import XNode from "@web-atoms/core/dist/core/XNode";
import styled from "@web-atoms/core/dist/style/styled";
import { Drawer } from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import PageNavigator from "@web-atoms/web-controls/dist/PageNavigator";
import HomePage from "../pages/home/Home";
import MultipleSelectionPage from "../pages/selection/MulipleSelectionPage";

const css = styled.css `
    cursor: pointer;
    padding: 5px 10px 5px 10px;
    border-radius: 10px;

    &:hover {
        background-color: lightgreen;
    }
`.installLocal();

const MenuItem = ({ label, icon = "", page}) => {
    return <div
        class={css}
        data-layout="row"
        event-click={() => PageNavigator.openPage(page)}>
        { icon && <i class={icon}/>}
        <span text={label}/>
    </div>;
};

export default class AppMenu extends Drawer {

    public async init() {

        this.renderer = <div data-layout="vertical-flex">
            <div>Other Samples</div>

            <MenuItem
                label="Home"
                page={HomePage}
                />

            <MenuItem
                label="Multiple Selection"
                page={MultipleSelectionPage}
                />

        </div>;
    }

}