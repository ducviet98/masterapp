import { Typography, Tooltip } from "@mui/material"

const ToolTipRow = ({ title }: { title: string }) => (
  <Tooltip sx={{
    width: '500px',
    fontSize: 12
  }} title={title} arrow>
    <Typography sx={{
      fontSize: 12,
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>{title}</Typography >
  </Tooltip>)

export default ToolTipRow