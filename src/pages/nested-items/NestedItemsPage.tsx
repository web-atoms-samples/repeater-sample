import XNode from "@web-atoms/core/dist/core/XNode";
import styled from "@web-atoms/core/dist/style/styled";
import AtomRepeater from "@web-atoms/web-controls/dist/basic/AtomRepeater";
import { ContentPage } from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import People, { IPerson } from "../../model/People";
import Action from "@web-atoms/core/dist/view-model/Action";
import PageNavigator from "@web-atoms/web-controls/dist/PageNavigator";
import ImageViewPage from "./ImageViewPage";

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
`.installLocal();


export default class NestedItemsPage extends ContentPage {

    public async init() {

        this.render(<div class={css}>
            <AtomRepeater
                items={People.females}
                itemRenderer={(item) => this.renderModel(item)}
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

        </div>);

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
        
        return <div class="model">
            <div class="name" text={item.name}/>
            <div class="files">
                { ... item.images.map((x, i) => <img
                    data-click-event="open-image"
                    data-item-path={`person=$, image=$.images.${i}`}
                    src={x}/>)}
            </div>
        </div>;
    }

    @Action({ onEvent: "open-image"})
    openImage({person, image}) {
        PageNavigator.pushPage(ImageViewPage, { person, image} )
    }

}
