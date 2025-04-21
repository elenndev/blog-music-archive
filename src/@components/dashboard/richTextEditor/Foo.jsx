import { Node, mergeAttributes } from '@tiptap/react'

const Foo = Node.create({
    name: 'foo',
  
    group: 'inline',
  
    inline: true,
  
    parseHTML() {
      return [
        {
          tag: 'span',
          getAttrs: node => node.hasAttribute('data-foo') && null,
        },
      ]
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['span', mergeAttributes({ 'data-foo': '', HTMLAttributes }), 'foo']
    },
  
    renderText() {
      return 'foo'
    },
  
    addCommands() {
      return {
        insertFoo: () => ({ commands }) => {
          return commands.insertContent({ type: this.name })
        },
      }
    },
  })

export default Foo