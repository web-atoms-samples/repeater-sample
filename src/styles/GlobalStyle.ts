
// install Data Styles
import "@web-atoms/data-styles/data-styles";

import styled from "@web-atoms/core/dist/style/styled";

    styled.css `

        :root {
            --accent-color: darkorange;
            --accent-text-color: white;
        }

    
        body, html {
            
        }

        * {
            font-family: verdana;
        }

        /* Repeater Item style */
        [data-item-index] {
            border-radius: 10px;
            padding: 10px 5px 10px 5px;
            cursor: pointer;
        }

        [data-item-index]:hover {
            background-color: lightgreen;
        }

        [data-item-index][data-selected-item=true] {
            color: white;
            background-color: blue;
            border-radius: 10px;
        }
    `.installGlobal();