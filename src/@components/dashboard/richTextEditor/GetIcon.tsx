import { TypeToolbarOptions } from "@/types";
import { IconContext } from "react-icons";
import { RiImageAddFill } from "react-icons/ri";
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaHighlighter, FaItalic, FaListOl, FaListUl, FaStrikethrough } from "react-icons/fa";
import { BsLink45Deg, BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";

export default function GetIcon({label, iconSize, iconColor} : {label: TypeToolbarOptions, iconSize: string, iconColor?: string}){
    const Icon = () => {
        switch(label){
            case 'Add Image':
                return (<RiImageAddFill />)

            case 'Bold':
                return (<FaBold />)

            case 'Bullet List':
                return (<FaListUl />)

            case 'Center':
                return (<FaAlignCenter />)

            case 'Left':
                return (<FaAlignLeft />)

            case 'Right':
                return (<FaAlignRight />)

            case 'Italic':
                return (<FaItalic />)

            case 'Strike':
                return (<FaStrikethrough />)

            case 'Ordered List':
                return (<FaListOl />)

            case 'Highlight':
                return (<FaHighlighter />)

            case 'H1':
                return (<BsTypeH1 />)

            case 'H2':
                return (<BsTypeH2 />)

            case 'H3':
                return (<BsTypeH3 />)

            case 'Link':
                return (<BsLink45Deg />)
        }
    }

    return <IconContext.Provider value={{size: iconSize, color: iconColor}}>
        <Icon/>
    </IconContext.Provider>
}