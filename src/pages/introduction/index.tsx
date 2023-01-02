/*
 * @Author: Carlos
 * @Date: 2023-01-01 15:03:21
 * @LastEditTime: 2023-01-02 21:54:58
 * @FilePath: /vite-react-swc/src/pages/introduction/index.tsx
 * @Description:
 */
import { MusicOne, Videocamera, ConfusedFace } from '@icon-park/react'
import clsx from 'clsx'
import { ChangeEvent, useCallback, useState } from 'react'
import {
  NeuPanel,
  NeuSwitch,
  NeuCheckbox,
  NeuRadio,
  NeuButton,
  NeuInput,
  NeuTabs
} from '@/components/neumorphism'
import PersonCard from './PersonCard'

type Props = unknown

// todo: Radio.Group

export default function Introduction(props: Props) {
  const size = 'md'
  const [switchChecked, setSwitchChecked] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [radioChecked, setRadioChecked] = useState(true)
  const [inputValue, setInputValue] = useState('')

  const changeSwitch = useCallback(
    (value: boolean) => {
      setSwitchChecked(value)
    },
    [switchChecked]
  )
  const changeCheckbox = useCallback(
    (value: boolean) => {
      setCheckboxChecked(value)
    },
    [checkboxChecked]
  )
  const changeRadioChecked = useCallback(
    (value: boolean) => {
      setRadioChecked(value)
    },
    [radioChecked]
  )
  const changeInput = useCallback(
    (s: ChangeEvent<HTMLInputElement>) => {
      setInputValue(s.target.value)
    },
    [inputValue]
  )
  return (
    <div className={clsx('bg-[#E4EBF5] min-h-screen flex py-6')}>
      <div className="">
        <PersonCard />
      </div>
      <div>
        <NeuPanel className="w-[600px] mx-auto px-4 py-6 text-gray-500">
          <div className="flex justify-center items-center">
            <NeuSwitch
              size={size}
              checked={switchChecked}
              onChange={changeSwitch}
            />
            <span className="mr-6" />
            position: relative;
            <span className="mr-6" />
            <NeuCheckbox
              size={size}
              checked={checkboxChecked}
              onChange={changeCheckbox}
            />
            <span className="mr-6" />
            justify-content: center;
            <span className="mr-6" />
            <NeuRadio
              size={size}
              checked={radioChecked}
              onChange={changeRadioChecked}
            />
          </div>
          <div className="mt-3">
            <NeuButton color="primary" block size={size}>
              BUTTon
            </NeuButton>

            <div className="mt-4">
              <NeuButton size={size}>BUTTon</NeuButton>
              <span className="mr-6" />
              <NeuButton shape="circle" size={size}>
                Xx
              </NeuButton>
              <span className="mr-6" />
              <NeuButton shape="circle" color="primary" size={size}>
                <MusicOne theme="filled" size="28" />
              </NeuButton>
              <span className="mr-6" />
              <NeuButton shape="circle" size={size}>
                <Videocamera theme="filled" size="28" />
              </NeuButton>
              <span className="mr-6" />
              <NeuButton size="sm">
                <ConfusedFace theme="outline" size="20" />
                <span className="ml-2">sm size React TS Next</span>
              </NeuButton>
            </div>
          </div>
          <div className="mt-4">
            <NeuInput
              block
              value={inputValue}
              onChange={changeInput}
              placeholder="Mongo is delicious."
            />
          </div>
          <div className="mt-4">
            <NeuInput
              size="md"
              icon={<ConfusedFace theme="outline" size="26" />}
              value={inputValue}
              onChange={changeInput}
              placeholder="Mongo is delicious."
            />
          </div>
          <div className="mt-4">
            <NeuTabs size={size} />
            <span className="mr-6" />
          </div>
        </NeuPanel>
      </div>
    </div>
  )
}
