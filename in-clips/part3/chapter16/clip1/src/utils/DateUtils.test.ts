import { getMillisToDateString } from "./DateUtils"

describe('특정 millisecond를 받았을때', ()=>{
    test('해당하는 날짜의 문자열로 변경 합니다', ()=>{
        expect(getMillisToDateString(1669136198786)).toBe('2022-11-23')
    })

    test('10이하의 날짜 일 경우, 0N으로 변경합니다', ()=>{
        expect(getMillisToDateString(1667228400000)).toBe('2022-11-01');
        
    })
})