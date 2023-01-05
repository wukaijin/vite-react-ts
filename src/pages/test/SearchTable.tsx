/*
 * @Author: Carlos
 * @Date: 2023-01-03 22:45:57
 * @LastEditTime: 2023-01-06 00:42:30
 * @FilePath: /vite-react-swc/src/pages/test/SearchTable.tsx
 * @Description:
 */
import { HTMLAttributes } from 'react'
import Table from '@/components/enhance/table'
import { QueryListData } from '@/api/music'

const { Head, Body, Row } = Table

type Props = Omit<HTMLAttributes<HTMLTableElement>, 'onClick'> & {
  data: QueryListData[]
  onClick: (id: QueryListData) => void
}
const SearchTable = (props: Props) => {
  const { data, onClick, className } = props
  return (
    <Table className={className}>
      <Head>
        <span>Id</span>
        <span>Name</span>
        <span>Artists</span>
        <span>mvId</span>
        <span>album</span>
        <span>duration</span>
      </Head>
      <Body>
        {data.map(item => {
          return (
            <Row key={item.id}>
              <span className="cursor-pointer" onClick={() => onClick(item)}>
                {item.id}
              </span>
              <span>{item.name}</span>
              <span>{item.artists[0].name}</span>
              <span>{item.mvid}</span>
              <span>{item.album.name}</span>
              <span>
                {`${Math.floor(item.duration / 36600)}:${Math.round(
                  (item.duration - Math.floor(item.duration / 36600) * 36600) / 1000
                )}`}
              </span>
            </Row>
          )
        })}
      </Body>
    </Table>
  )
}
export default SearchTable
