import XNode from "@web-atoms/core/dist/core/XNode";
import { ContentPage } from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import CurrencyArray from "../../model/CurrencyArray";
import { ICurrency } from "../../model/ICurrency";
import AtomRepeater from "@web-atoms/web-controls/dist/basic/AtomRepeater";
import Bind from "@web-atoms/core/dist/core/Bind";
import Action from "@web-atoms/core/dist/view-model/Action";
import PageNavigator from "@web-atoms/web-controls/dist/PageNavigator";
import ImageViewPage from "../nested-items/ImageViewPage";
import InjectProperty from "@web-atoms/core/dist/core/InjectProperty";
import styled from "@web-atoms/core/dist/style/styled";
import PersonService, { IPerson } from "../../services/PersonService";

const css = styled.css `
    & .model {
        display: inline-block;
        width: 150px;

        & > .files {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            & > img {
                height: 70px;
            }
        }
    }

    & [data-selected-item=true] {
        background-color: var(--accent-color);
    }
`.installLocal();


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
    public selectedItem: IPerson = null;

    @InjectProperty
    private personService: PersonService;

    public async init() {

        this.title = "AtomRepeater Sample";

        const models = await this.personService.loadPeople();

        this.headerRenderer = () => <div>
            To check other samples, open drawer.
        </div>;

        // If items has been set to an array of specific type
        // itemRendere will display intellisense correctly

        this.renderer = <div class={css}>
            <AtomRepeater
                items={models}
                itemRenderer={(item) => this.renderModel(item)}
                selectedItem={Bind.twoWays(() => this.selectedItem)}
                />

            <div>
                In this example, item-path has been set with each image
                as `person=$, image=$.images.0`.
                <br/><br/>
                So when we click the item, in event's detail we will receive
                {` { person, image } `} in which we will get which item was
                clicked and which image was clicked.
                <br/><br/>
                This way you can 
                use single AtomRepeater and you can easily manage event handlers.
            </div>
        </div>;

        // Footer will be displayed only
        // if the item is selected
        this.footerRenderer = () => <div
            style-display={Bind.oneWay(() => !!this.selectedItem)}
            data-layout="command-row">
            <span text={Bind.oneWay(() => `Selected Person is ${this.selectedItem?.name}`)}/>
        </div>;
    }

    @Action({ onEvent: "open-image"})
    openImage({person, image}) {
        PageNavigator.pushPage(ImageViewPage, { person, image} )
    }

    renderModel(item: IPerson): XNode {

        /**
         * we will set `data-item-path`, 
         * item path will tranform the item
         * in click event. 
         * 
         * The format is as follow,
         * Property Path $.property.property... 
         *      $ is the actual item and after that
         *      path will be evaluated and it will be sent.
         *      e.g. `$.files.2` results in `item.files[2]`
         *      
         * Json
         *      Any valid json { "property" : "json-value"}
         * 
         * Multiple Property Path,
         *      You can use mutliple property path with key specified.
         * 
         *      e.g. `item=$, file=$.images.2` results in 
         *           `{ item:Item , file:string }`
         * 
         * 
         * So when we set the item path = `person=$, image=$.images.${index}`
         * it will set attribute "person=$, image=$.images.0" and which will
         * give us { person, image}.
         * 
         * In this example, we are receiving item as well as which image that
         * was clicked.
         * 
         */
        
        return <div class="model" data-click-event="item-select">
            <div class="name" text={item.name}/>
            <div class="files">
                { ... item.images.map((x, i) => <img
                    data-click-event="open-image"
                    data-item-path={`person=$, image=$.images.${i}`}
                    src={x}/>)}
            </div>
        </div>;
    }
}
