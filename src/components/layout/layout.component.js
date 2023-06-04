import renderService from "@/core/services/render.service"
import { Header } from "./header/header.component"

import template from './layout.template.html'
import styles from './layout.module.scss'

import { $M } from "@/core/mquery/mquery.lib";
import ChildComponent from "@/core/component/child-screen.component";
import { Notification } from "./notification/notification.component";

export class Layout extends ChildComponent {
    constructor({router, children}){
        super()
        this.router = router
        this.children = children
    }
    render(){
        this.element = renderService.htmlToElement(template, [Notification], styles)

        const mainElement = $M(this.element).find('main')

        const contentContainer  = $M(this.element).find('#content')
        contentContainer.append(this.children)

        mainElement.before(new Header({
            router: this.router
        }).render()).append(contentContainer.element)

        return this.element
    }
}