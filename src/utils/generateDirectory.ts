/*
 * @Author: Carlos
 * @Date: 2023-01-20 23:07:15
 * @LastEditTime: 2023-01-21 01:07:30
 * @FilePath: /vite-react-swc/src/utils/generateDirectory.ts
 * @Description:
 */
type Title = {
  title: string
  index: number
  children?: Title[]
}
const getMatchers = (matchers: IterableIterator<RegExpMatchArray>, length: number) =>
  [...matchers].map(item => {
    return {
      title: item[1] || item[2],
      index: item.index === undefined ? length : item.index
    }
  })
function generateDirectory(text: string, level = 3): Title[] {
  let result: Title[]
  const records: Title[][] = []
  for (let currentLevel = 1; currentLevel <= level; currentLevel++) {
    const currentLevelRegExp = new RegExp(
      `^${''.padStart(currentLevel, '#')}\\s(.+)\\s|[^#]${''.padStart(
        currentLevel,
        '#'
      )}\\s(.+)\\s`,
      'g'
    )
    if (currentLevel === 1) {
      const matchers = text.matchAll(currentLevelRegExp)
      result = getMatchers(matchers, text.length)
      records.push(result)
    } else {
      records[currentLevel - 2].forEach((currentSection, currentSectionIndex) => {
        const startIndex = currentSection.index
        const nextSection = records[currentLevel - 2][currentSectionIndex + 1]
        const endIndex = nextSection?.index || text.length
        const currentText = text.slice(startIndex, endIndex)
        const matchers = currentText.matchAll(currentLevelRegExp)
        const mm = getMatchers(matchers, currentText.length)
        if (mm && mm.length) {
          currentSection.children = mm
          if (!records[currentLevel - 1]) {
            records[currentLevel - 1] = []
          }
          records[currentLevel - 1].push(...mm)
        }
      })
    }
  }
  return records[0]
}

export default generateDirectory
