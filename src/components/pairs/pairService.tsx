import { Card } from './card'
import { CountOfCards } from '../../types'
import { icons, imCool } from './icons'

export class PairService {
  icons: JSX.Element[] = icons
  countOfCards: CountOfCards

  constructor(countOfCards: CountOfCards) {
    this.countOfCards = countOfCards
  }

  sliceIcons() {
    this.icons = this.icons.slice(0, this.countOfCards)
  }

  doubleIcons() {
    this.icons = this.icons.concat(this.icons)
  }

  shuffleIcons() {
    this.icons.sort(() => Math.random() - 0.5)
  }

  addCentralIcon() {
    if (!Number.isInteger((2 * this.countOfCards) ** 0.5)) {
      this.icons.splice(this.countOfCards, 0, imCool)
    }
  }

  getGridClass() {
    if (this.countOfCards === 4) {
      return 'grid-9'
    }

    if (this.countOfCards === 8) {
      return 'grid-16'
    }

    return 'grid-25'
  }

  renderIcons() {
    this.sliceIcons()
    this.doubleIcons()
    this.shuffleIcons()
    this.addCentralIcon()

    return this.icons.map((icon, index) => (
      <Card
        key={index}
        icon={icon}
      />
    ))
  }

}