let SR_CLK = DigitalPin.P16;
let INSR0_DATA = DigitalPin.P12;        //Data
let INSR_LATCH = 8;

enum KEY {
    IN1 = 0,
    IN2 = 1,
    IN3 = 2,
    IN4 = 3,
    LEFT = 8,
    UP = 9,
    DOWN = 10,
    RIGHT = 11,
    A = 12,
    B = 13,
    MENU = 14,
};

namespace ThinkBox {
    let KEYSCAN = 0;
    
    //% subcategory=KeyPad
    //% blockID==Listen_Key
    //% block="Listen_Key"
    //% weight=90
    export function Read74HC165(): void {
        pins.setPull(INSR0_DATA, PinPullMode.PullUp)
        FullOff(INSR_LATCH);
        control.waitMicros(25000);
        FullOn(INSR_LATCH);
        control.waitMicros(20000);
        KEYSCAN = 0;
        let i = 0;
        for (i = 0; i < 16; i++) {
            KEYSCAN = KEYSCAN << 1;
            let tmp = pins.digitalReadPin(INSR0_DATA);
            KEYSCAN |= tmp;
            pins.digitalWritePin(SR_CLK, 0);
            control.waitMicros(1000);
            pins.digitalWritePin(SR_CLK, 1);
        }
        //basic.showNumber(KEYSCAN);
    }

    //% subcategory=KeyPad
    //% blockID==Listen_Key
    //% block="Key %pin |Press"
    //% weight=90
    export function Listen_Key(pin: KEY): boolean {
        let res = (KEYSCAN >> pin) & 0x01;
        if (res == 1) {
            return false;
        }
        return true;
    }
}

