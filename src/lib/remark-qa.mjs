/**
 * 把 remark-directive 的容器指令转成带 class 的 HTML 元素，用于问答气泡排版：
 *
 * :::question 提问（可选 model 属性标注模型）
 * 这段会渲染成提问气泡
 * :::
 *
 * :::answer{model="GLM"} 回答
 * 这段会渲染成回答气泡
 * :::
 *
 * :::summary 总结
 * 渲染成高亮的总结块
 * :::
 */
import { visit } from 'unist-util-visit'

const CONTAINER_CLASS = {
  question: 'qa-bubble qa-question',
  answer: 'qa-bubble qa-answer',
  summary: 'qa-summary',
}

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export function remarkQaContainers() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        (node.type !== 'containerDirective' && node.type !== 'leafDirective') ||
        !(node.name in CONTAINER_CLASS)
      ) {
        return
      }
      const classes = [CONTAINER_CLASS[node.name]]
      const model = node.attributes?.model
      if (model) classes.push(`qa-model-${model}`)

      // 让第一个子段落渲染为气泡头部的标签（提问/回答者名）
      const label = node.name === 'question' ? '问' : node.name === 'answer' ? `答${model ? ' · ' + model : ''}` : '总结'
      node.data ??= {}
      node.data.hName = 'div'
      node.data.hProperties = {
        class: classes.join(' '),
        'data-label': label,
      }
    })
  }
}
