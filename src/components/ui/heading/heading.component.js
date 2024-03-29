import ChildComponent from '@/core/component/child.component'
import { $M } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import styles from './heading.module.scss'
import template from './heading.template.html'

export class Heading extends ChildComponent {
	constructor(title = '') {
		super()
		this.title = title
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$M(this.element).text(this.title)

		return this.element
	}
}
