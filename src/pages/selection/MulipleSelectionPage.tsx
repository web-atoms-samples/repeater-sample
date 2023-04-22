import Bind from "@web-atoms/core/dist/core/Bind";
import XNode from "@web-atoms/core/dist/core/XNode";
import AtomRepeater, { SelectorCheckBox } from "@web-atoms/web-controls/dist/basic/AtomRepeater";
import { ContentPage } from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import CurrencyArray from "../../model/CurrencyArray";
import { ICurrency } from "../../model/ICurrency";

export default class MultipleSelectionPage extends ContentPage {

    public selectedItems: ICurrency[] = [];

    public async init() {
        this.title = "Multiple Selection Sample";

        this.headerRenderer = () => <div>
            To check other samples, open drawer.
        </div>;

        // If items has been set to an array of specific type
        // itemRendere will display intellisense correctly

        this.renderer = <div>
            <AtomRepeater
                items={CurrencyArray()}
                allowMultipleSelection={true}
                selectedItems={this.selectedItems}
                itemRenderer={(item) => <div
                    data-layout="row">
                    <SelectorCheckBox/>
                    <i class="fas fa-currency"/> <span text={item.currencyCode}/>
                    <span text={item.currency}/>
                </div>}
                />
        </div>;

        // Footer will be displayed only
        // if the item is selected
        this.footerRenderer = () => <div
            style-display={Bind.oneWay(() => !!this.selectedItems.length)}
            data-layout="command-row">
            <span
                text={Bind.oneWay(() => `Selected Currencies - ${ (this.selectedItems.length, this.selectedItems.map((x) => x.currency).join(","))}`)}/>
        </div>;
    }

}
