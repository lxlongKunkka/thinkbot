namespace ThinkBox {
    let SR04_I2C_ADDR = 0x57


    /**
     * Read ultrasonic sensor. Connect TRIG to SCL, ECHO to SDA
     */
    //% subcategory=DistanceSensor
    //% blockId="pingcm" block="ping cm"
    //% weight=100 blockGap=3 
    export function pingcm(): number {

        pins.i2cWriteNumber(SR04_I2C_ADDR, 1, NumberFormat.UInt8BE)
        basic.pause(120)
        let readbuf = pins.i2cReadBuffer(SR04_I2C_ADDR, pins.sizeOf(NumberFormat.UInt8LE) * 3)


        let distance = (readbuf[0] * 65536 + readbuf[1] * 256 + readbuf[2]) / 10000;
        return (Math.round(distance))

    }
}