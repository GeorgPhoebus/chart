import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tvl from './components/Tvl'
import Volume from './components/Volume'
import Price from './components/Price'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`

const ContentWrapper = styled.div`
  width: 90%;
`

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 16px;
`

const PoolsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`

const PoolWrapper = styled.div`
  width: 49%;

  @media screen and (max-width: 720px) {
    width: 100%;
  }
`

const Selector = styled.div`
`

const pools = ['Overall', 'tUSDC/tWETH', 'tCOMP/tUSDC', 'tst/weth', 'tst/tusdc']
const tokens = ['tWETH', 'tCOMP', 'TST']

function App() {
  const [data, setData] = useState<Object>({})
  const [labels, setLabels] = useState<Array<string>>([])
  const [flag, setFlag] = useState<boolean>(false)
  const [poolId, setPoolId] = useState<number>(0)
  const [tokenId, setTokenId] = useState<number>(0)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (index = 0) => {
    setAnchorEl(null);
    setPoolId(index)
  };

  const [anchorEl_2, setAnchorEl_2] = React.useState<null | HTMLElement>(null);
  const open_2 = Boolean(anchorEl_2);
  const handleClick_2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl_2(event.currentTarget);
  };
  const handleClose_2 = (index = 0) => {
    setAnchorEl_2(null);
    setTokenId(index)
  };

  let tmpLabels = new Array<string>()
  let tmpData = {}

  const getTwoDigital = (str: string) => {
    return str.padStart(2, '0')
  }

  if (!flag) {
    setFlag(true)
    for (let m = 0; m < 4; m++) {
      const month = getTwoDigital((m + 1).toString())
      let d = 0
      while (d < 31) {
        const day = getTwoDigital((d + 1).toString())
        fetch(`backups/2022-${month}-${day}/db_00.json`, { mode: 'no-cors' })
          .then(response => response.json())
          .then(datum => {
            tmpLabels.push(month + day)
            tmpData = { ...tmpData, [month + day]: datum }
          })
          .catch(error => console.error(error))
          .finally(() => {
            if (m === 3 && d === 31) {
              setLabels(tmpLabels)
              setData(tmpData)
            }
          })
        d++
      }
    }
  }
  console.log('data', data)

  let tvlData = []
  let volumeData = []
  let prices = []

  tvlData[0] = {
    labels,
    datasets: [
      {
        label: 'Total Value Locked[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          let price = datum.pools[1].tokenBReserves[0] / datum.pools[1].tokenAReserves[0]
          tvl += datum.pools[1].tokenBReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          tvl += datum.pools[2].tokenAReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          tvl += datum.pools[3].tokenAReserves[0] * price / 10 ** datum.tokens[1].tokenDecimals
          tvl += datum.pools[4].tokenAReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          return tvl
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      }
    ],
  }

  tvlData[1] = {
    labels,
    datasets: [
      {
        label: 'Total Value Locked[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          tvl += datum.pools[1].tokenBReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          return tvl
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      }
    ],
  }

  tvlData[2] = {
    labels,
    datasets: [
      {
        label: 'Total Value Locked[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          tvl += datum.pools[2].tokenBReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          return tvl
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      }
    ],
  }

  tvlData[3] = {
    labels,
    datasets: [
      {
        label: 'Total Value Locked[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          let price = datum.pools[1].tokenBReserves[0] / datum.pools[1].tokenAReserves[0]
          tvl += datum.pools[3].tokenAReserves[0] * price / 10 ** datum.tokens[1].tokenDecimals
          return tvl
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      }
    ],
  }

  tvlData[4] = {
    labels,
    datasets: [
      {
        label: 'Total Value Locked[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          tvl += datum.pools[4].tokenAReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          return tvl
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      }
    ],
  }

  let lastTVL = 0
  volumeData[0] = {
    labels,
    datasets: [
      {
        label: 'Volume[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          let price = datum.pools[1].tokenBReserves[0] / datum.pools[1].tokenAReserves[0]
          tvl += datum.pools[1].tokenBReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          tvl += datum.pools[2].tokenAReserves[0] / 10 ** datum.tokens[1].tokenDecimals
          tvl += datum.pools[3].tokenAReserves[0] * price / 10 ** datum.tokens[1].tokenDecimals
          tvl += datum.pools[4].tokenAReserves[0] / 10 ** datum.tokens[1].tokenDecimals

          let volume = Math.abs(tvl - lastTVL)
          lastTVL = tvl
          return volume
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  lastTVL = 0
  volumeData[1] = {
    labels,
    datasets: [
      {
        label: 'Volume[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          tvl += datum.pools[1].tokenBReserves[0] / 10 ** datum.tokens[1].tokenDecimals

          let volume = Math.abs(tvl - lastTVL)
          lastTVL = tvl
          return volume
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  lastTVL = 0
  volumeData[2] = {
    labels,
    datasets: [
      {
        label: 'Volume[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          tvl += datum.pools[2].tokenBReserves[0] / 10 ** datum.tokens[1].tokenDecimals

          let volume = Math.abs(tvl - lastTVL)
          lastTVL = tvl
          return volume
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  lastTVL = 0
  volumeData[3] = {
    labels,
    datasets: [
      {
        label: 'Volume[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          let price = datum.pools[1].tokenBReserves[0] / datum.pools[1].tokenAReserves[0]
          tvl += datum.pools[3].tokenAReserves[0] * price / 10 ** datum.tokens[1].tokenDecimals

          let volume = Math.abs(tvl - lastTVL)
          lastTVL = tvl
          return volume
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  lastTVL = 0
  volumeData[4] = {
    labels,
    datasets: [
      {
        label: 'Volume[USD]',
        data: Object.values(data).map((datum) => {
          let tvl = 0;
          tvl += datum.pools[4].tokenAReserves[0] / 10 ** datum.tokens[1].tokenDecimals

          let volume = Math.abs(tvl - lastTVL)
          lastTVL = tvl
          return volume
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  prices[0] = {
    labels,
    datasets: [
      {
        label: 'Price[USD]',
        data: Object.values(data).map((datum) => {
          let price = datum.pools[1].tokenBReserves[0] / datum.pools[1].tokenAReserves[0]
          return price
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true
      }
    ],
  }

  prices[1] = {
    labels,
    datasets: [
      {
        label: 'Price[USD]',
        data: Object.values(data).map((datum) => {
          let price = datum.pools[2].tokenAReserves[0] / datum.pools[2].tokenBReserves[0]
          return price
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true
      }
    ],
  }

  prices[2] = {
    labels,
    datasets: [
      {
        label: 'Price[USD]',
        data: Object.values(data).map((datum) => {
          let price = datum.pools[4].tokenAReserves[0] / datum.pools[4].tokenBReserves[0]
          return price
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true
      }
    ],
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <Container>
          <Selector>
            Pools :&nbsp;
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {pools[poolId]}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose(poolId)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {pools.map((pool, index) => <MenuItem key={pool} onClick={() => handleClose(index)}>{pool}</MenuItem>)}
            </Menu>
          </Selector>
          <PoolsWrapper>
            <PoolWrapper>
              <Tvl data={tvlData[poolId]} />
            </PoolWrapper>
            <PoolWrapper>
              <Volume data={volumeData[poolId]} />
            </PoolWrapper>
          </PoolsWrapper>
          <Selector>
            Tokens :&nbsp;
            <Button
              id="basic-button_2"
              aria-controls={open_2 ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open_2 ? 'true' : undefined}
              variant="contained"
              onClick={handleClick_2}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {tokens[tokenId]}
            </Button>
            <Menu
              id="basic-menu_2"
              anchorEl={anchorEl_2}
              open={open_2}
              onClose={() => handleClose_2(tokenId)}
              MenuListProps={{
                'aria-labelledby': 'basic-button_2',
              }}
            >
              {tokens.map((token, index) => <MenuItem key={token} onClick={() => handleClose_2(index)}>{token}</MenuItem>)}
            </Menu>
          </Selector>
          <PoolsWrapper>
            <PoolWrapper>
              <Price data={prices[tokenId]} />
            </PoolWrapper>
          </PoolsWrapper>
        </Container>
      </ContentWrapper>
    </PageWrapper >
  );
}

export default App;
