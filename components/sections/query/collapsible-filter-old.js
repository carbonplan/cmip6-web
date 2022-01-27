import { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { Expander, Filter, Group, Link } from '@carbonplan/components'

const CollapsibleFilter = ({ values, setValues, id, count = 4, ...props }) => {
  const options = Object.keys(values)
  const [collapsed, setCollapsed] = useState(true)

  if (options.length <= count) {
    return <Filter {...props} values={values} setValues={values} />
  } else {
    return (
      <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Filter
          {...props}
          sx={{ display: 'inline-block' }}
          values={
            collapsed
              ? options.slice(0, 3).reduce((a, key) => {
                  a[key] = values[key]
                  return a
                }, {})
              : values
          }
          setValues={(v) =>
            setValues(
              options.reduce((a, key) => {
                a[key] = v.hasOwnProperty(key) ? v[key] : values[key]
                return a
              }, {})
            )
          }
        />
        <Box sx={{ flexShrink: 0 }}>
          <Expander
            id={id}
            sx={{ width: 20, height: 20 }}
            value={!collapsed}
            onClick={() => setCollapsed((prev) => !prev)}
          />
        </Box>
      </Flex>
    )
  }
}

export default CollapsibleFilter
