
import React from 'react'

let win = typeof window !== 'undefined' ? window : false

class Grid extends React.Component {

  constructor () {
    super ()
    this.onResize = this.onResize.bind(this)
    this.state = {
      width: 768,
      inline: false,
      total: 1024
    }
  }

  onResize () {
    let el = React.findDOMNode(this)
    let width = el.offsetWidth
    let inline = false
    let total = 0
    React.Children.map(this.props.children, function(c, i) {
      let min = c.props.min || false
      if (!min) {
        min = c.props.x * width
      }
      total += min
    })
    if (total < width) {
      inline = true
    }
    this.setState({
      width: width,
      inline: inline,
      total: total
    })
  }

  componentDidMount () {
    this.onResize()
    if (win) {
      win.addEventListener('resize', this.onResize)
    }
  }

  componentDidUnmount () {
    if (win) {
      win.removeEventListener('resize', this.onResize)
    }
  }

  render () {
    let props = this.props
    let state = this.state
    let style = {
      overflow: 'hidden',
      marginLeft: -props.gutter,
      marginRight: -props.gutter,
    }
    let children = React.Children.map(this.props.children, function(c) {
      return React.cloneElement(c, {
        padding: props.gutter,
        width: state.width,
        total: state.total,
        inline: state.inline
      })
    })
    return (
      <div style={style}>
        {children}
      </div>
    )
  }

}

Grid.propTypes = {
  gutter: React.PropTypes.number,
}

Grid.defaultProps = {
}

export default Grid
