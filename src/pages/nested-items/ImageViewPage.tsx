import XNode from "@web-atoms/core/dist/core/XNode";
import { ContentPage } from "@web-atoms/web-controls/dist/mobile-app/MobileApp";
import { IPerson } from "../../model/People";

export default class ImageViewPage extends ContentPage<{person: IPerson, image: string}> {

    public async init() {
        this.title = this.parameters.person.name;
        this.render(<div>
            <img src={this.parameters.image}/>
        </div>);
    }

}