/*
 * @Author: Carlos
 * @Date: 2023-01-01 15:03:21
 * @LastEditTime: 2023-01-04 23:26:32
 * @FilePath: /vite-react-swc/src/pages/introduction/index.tsx
 * @Description:
 */
import { MusicOne, Videocamera, ConfusedFace, Kungfu } from '@icon-park/react'
import clsx from 'clsx'
import { ChangeEvent, useCallback, useState } from 'react'
import {
  NeuPanel,
  NeuSwitch,
  NeuCheckbox,
  NeuRadio,
  NeuButton,
  NeuInput,
  NeuTabs,
  NeuSlider,
  NeuPlayButton
} from '@/components/neumorphism'
import PersonCard from './PersonCard'

type Props = unknown

// todo: Radio.Group
const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]

const sizeMapping = [
  {
    value: 'sm',
    render: 'sm'
  },
  {
    value: 'md',
    render: 'md'
  },
  {
    value: 'lg',
    render: 'lg'
  }
]
const tabsMapping = [
  {
    value: 1,
    render: (
      <div className="flex justify-center items-center">
        <span className="mr-1">Kungfu?</span>
        <Kungfu theme="filled" size="24" />
      </div>
    )
  },
  {
    value: 2,
    render: 'OK'
  },
  {
    value: 3,
    render: (
      <div className="flex justify-center items-center">
        <span className="text-green-500">Soccer</span>
      </div>
    )
  }
]
export default function Introduction(props: Props) {
  const [switchChecked, setSwitchChecked] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [radioChecked, setRadioChecked] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [size, setSize] = useState<Size>('md')
  const [tab, setTab] = useState(2)
  const [slider1, setSlider1] = useState(0)
  const [slider2, setSlider2] = useState(50)
  const [slider3, setSlider3] = useState(100)
  const [playing, setPlaying] = useState(true)
  const changeInput = useCallback(
    (s: ChangeEvent<HTMLInputElement>) => {
      setInputValue(s.target.value)
    },
    [inputValue]
  )
  return (
    <div className={clsx('bg-[#E4EBF5] min-h-screen pb-8')}>
      <div className="">
        <PersonCard />
      </div>
      <div className="px-4 max-w-[100vw] sm:w-[375px] mx-auto py-2 text-gray-500 mb-2">
        <NeuTabs
          size="md"
          block
          value={size}
          items={sizeMapping}
          onChange={siz => {
            // todo reasoned type out
            setSize(siz as Size)
          }}
        />
      </div>
      <div className="max-w-[100vw] sm:w-[600px] px-4 sm:mx-auto">
        <NeuPanel className="px-4 py-6 text-gray-500">
          <div className="mb-4">
            <NeuTabs
              size={size}
              value={tab}
              items={tabsMapping}
              onChange={siz => {
                setTab(siz as number)
              }}
            />
          </div>
          <div className="flex flex-row py-4">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="m-auto">
                <div className="text-center">
                  <NeuSwitch size={size} checked={switchChecked} onChange={setSwitchChecked} />
                  <span className="mr-3" />
                  <NeuSwitch size={size} checked={!switchChecked} onChange={setSwitchChecked} />
                </div>
                <div className="py-6 text-center">
                  <NeuCheckbox
                    size={size}
                    checked={checkboxChecked}
                    onChange={setCheckboxChecked}
                  />
                  <span className="mr-8" />
                  <NeuCheckbox
                    size={size}
                    checked={!checkboxChecked}
                    onChange={setCheckboxChecked}
                  />
                </div>
                <div className="text-center">
                  <NeuRadio size={size} checked={radioChecked} onChange={setRadioChecked} />
                  <span className="mr-8" />
                  <NeuRadio size={size} checked={!radioChecked} onChange={setRadioChecked} />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="m-auto">
                <div className="text-center">
                  <NeuButton shape="circle" color="primary" size={size}>
                    <MusicOne theme="filled" />
                  </NeuButton>
                  <span className="mr-4" />
                  <NeuButton shape="circle" size={size}>
                    <Videocamera theme="filled" />
                  </NeuButton>
                </div>
                <div className="text-center pt-6 pb-3">
                  <NeuButton size={size}>BUTTon</NeuButton>
                </div>
                <div className="text-center">
                  <NeuButton color="primary" size={size}>
                    BUTTon
                  </NeuButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <NeuButton color="primary" block size={size}>
              BUTTon
            </NeuButton>
          </div>
          <div className="mt-4">
            <NeuInput
              block
              size={size}
              value={inputValue}
              onChange={changeInput}
              placeholder="Mongo is delicious."
            />
          </div>
          <div className="mt-4">
            <NeuInput
              size={size}
              icon={<ConfusedFace theme="outline" />}
              value={inputValue}
              onChange={changeInput}
              placeholder="Mongo is delicious."
            />
          </div>
          <div className="mt-4">
            <NeuButton size={size}>
              <ConfusedFace theme="outline" />
              <span className="ml-2">sm size React TS Next</span>
            </NeuButton>
          </div>

          <div className="mt-8">
            <NeuSlider size="sm" value={slider1} onChange={setSlider1} />
          </div>
          <div className="mt-8 mr-32">
            <NeuSlider size="md" value={slider2} onChange={setSlider2} />
          </div>
          <div className="mt-8  ml-20">
            <NeuSlider size="lg" value={slider3} onChange={setSlider3} />
          </div>
          <div className="pt-12 pb-8 pl-8">
            <NeuPlayButton size={size} playing={playing} onChange={() => setPlaying(!playing)} />
          </div>
        </NeuPanel>
      </div>
    </div>
  )
}
