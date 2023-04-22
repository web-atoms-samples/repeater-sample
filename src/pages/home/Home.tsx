import XNode from "@web-atoms/core/dist/core/XNode";
import { ContentPage } from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import CurrencyArray from "../../model/CurrencyArray";
import { ICurrency } from "../../model/ICurrency";
import AtomRepeater from "@web-atoms/web-controls/dist/basic/AtomRepeater";
import Bind from "@web-atoms/core/dist/core/Bind";

/**
 * This sample displays how to use AtomRepeater.
 * 
 * AtomRepater class is a single control capable of handling,
 * selection, drag drop and rendering. Each item is a simple
 * html element and there are no event listeners attached to
 * any item.
 * 
 * Default style is set in GlobalStylt.ts
 */
export default class HomePage extends ContentPage {

    /**
     * For binding to work successfully, we need to initialize
     * the variable to null. As binding ignores path with undefined
     * value.
     */
    public selectedItem: ICurrency = null;

    public async init() {

        this.title = "AtomRepeater Sample";

        this.headerRenderer = () => <div>
            To check other samples, open drawer.
        </div>;

        // If items has been set to an array of specific type
        // itemRendere will display intellisense correctly

        this.renderer = <div>
            <AtomRepeater
                items={CurrencyArray()}
                selectedItem={Bind.twoWays(() => this.selectedItem)}
                itemRenderer={(item) => <div
                    data-click-event="item-select"
                    data-layout="row">
                    <i class="fas fa-currency"/> <span text={item.currencyCode}/>
                    <span text={item.currency}/>
                </div>}
                />
        </div>;

        // Footer will be displayed only
        // if the item is selected
        this.footerRenderer = () => <div
            style-display={Bind.oneWay(() => !!this.selectedItem)}
            data-layout="command-row">
            <span text={Bind.oneWay(() => `Selected Currency is ${this.selectedItem.currency}`)}/>
        </div>;
    }

}
