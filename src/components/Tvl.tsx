import React, { useState } from 'react'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`

interface Props {
  data: any
}

const Tvl: React.FC<Props> = ({ data }) => {
  const [unit, setUnit] = useState<number>(data.length)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        max: unit
      }
    }
  };

  return (
    <div>
      <ButtonWrapper>
        <ButtonGroup variant="contained" size="small" aria-label="outlined primary button group">
          <Button onClick={() => setUnit(data.length)}>D</Button>
          <Button onClick={() => setUnit(7)}>W</Button>
          <Button onClick={() => setUnit(30)}>M</Button>
        </ButtonGroup>
      </ButtonWrapper>
      <Line options={options} data={data} />
    </div>
  )
}

export default Tvl