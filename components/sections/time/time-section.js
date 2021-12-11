import Inputs from './inputs'
import Section from '../../section'

const TimeSection = ({ sx }) => {
  return (
    <Section sx={sx.heading} label='Time'>
      <Inputs />
    </Section>
  )
}

export default TimeSection
