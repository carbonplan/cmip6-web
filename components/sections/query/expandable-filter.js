import { useState } from 'react'
import { Filter } from '@carbonplan/components'

const ALL = 'All'
const EXPAND = 'Select GCMs'

const ExpandableFilter = ({ values, setValues, ...props }) => {
  const options = Object.keys(values)
  const [collapsed, setCollapsed] = useState(true)

  if (collapsed) {
    return (
      <Filter
        values={{ [ALL]: true, [EXPAND]: false }}
        setValues={(obj) => {
          setCollapsed(!obj[EXPAND])
          setValues(
            options.reduce((a, k) => {
              a[k] = false
              return a
            }, {})
          )
        }}
        {...props}
      />
    )
  } else {
    return (
      <Filter
        values={{ [ALL]: false, ...values }}
        setValues={({ [ALL]: all, ...obj }) => {
          if (all) {
            setCollapsed(true)
            setValues(
              options.reduce((a, k) => {
                a[k] = true
                return a
              }, {})
            )
          } else {
            setValues(obj)
          }
        }}
        {...props}
      />
    )
  }
}

export default ExpandableFilter
