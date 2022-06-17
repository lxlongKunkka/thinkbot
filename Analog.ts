let PCF8591_ADDRESS = 72;

enum AO {
    IN0 = 0,
    IN1,
    IN2,
    IN3,
    OUT
}

namespace ThinkBox {
    //% subcategory=Analog
    //% blockID==Analog
    //% block="DAC %val"
    //% weight=90
    //% val.min = 0 val.max = 255
    export function DAC(val: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = 64;
        buf[1] = val;
        pins.i2cWriteBuffer(PCF8591_ADDRESS, buf);
    }

    //% subcategory=Analog
    //% blockID==Analog
    //% block="ADC %channel"
    //% weight=90
    export function ADC(channel: AO): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x40 | channel;
        pins.i2cWriteBuffer(PCF8591_ADDRESS, buf);
        let res = pins.i2cReadNumber(PCF8591_ADDRESS, NumberFormat.UInt8LE, false);
        res = pins.i2cReadNumber(PCF8591_ADDRESS, NumberFormat.UInt8LE, false);
        return res;
    }

    //% subcategory=Analog
    //% blockID==Analog
    //% block="Scan"
    //% weight=90
    export function ScanAllChannel(): number[] {
        let buf = pins.createBuffer(1);
        buf[0] = 0x44;
        pins.i2cWriteBuffer(PCF8591_ADDRESS, buf);
        pins.i2cReadNumber(PCF8591_ADDRESS, NumberFormat.UInt8LE, false);
        let res = [-1, -1, -1, -1];
        for (let i = 0; i < 4; i++) {
            res[i] = pins.i2cReadNumber(PCF8591_ADDRESS, NumberFormat.UInt8LE, false);
        }
        return res;
    }
}

