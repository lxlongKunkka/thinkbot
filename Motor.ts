/*****************************************************************************
* | File      	:   SSLCD1in8.ts
* | Function    :   Contorl ST7735 1.8inch lcd Show
* | Info        :
*----------------
* | This version:   V2.0
* | Date        :   2022-03-21
* | Info        :   for micro:bit v2
*
******************************************************************************/

enum Motors {
    //% block="M1"
    M1 = 0x1,
    //% block="M2"
    M2 = 0x2,
}

namespace ThinkBox {

    //% subcategory=Motor
    //% blockId=MotorRun block="Motor|%index|speed %speed"
    //% speed eg: 150
    //% weight=100
    //% speed.min=-255 speed.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function MotorRun(index: Motors, speed: number): void {
        speed = speed * 16; // map 255 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= -4096) {
            speed = -4095
        }
        if (index == 1) {
            if (speed >= 0) {
                setPwm(2, 0, 4095)
                setPwm(3, 0, 0)
                setPwm(1, 0, speed)
            } else {
                setPwm(2, 0, 0)
                setPwm(3, 0, 4095)
                setPwm(1, 0, -speed)
            }
        } else if (index == 2) {
            if (speed >= 0) {
                setPwm(5, 0, 4095)
                setPwm(4, 0, 0)
                setPwm(6, 0, speed)
            } else {
                setPwm(5, 0, 0)
                setPwm(4, 0, 4095)
                setPwm(6, 0, -speed)
            }
        }
    }

    //% subcategory=Motor
    //% blockId=MotorStop block="Motor Stop"
    //% weight=100
    export function stop() {
        MotorRun(Motors.M1, 0)
        MotorRun(Motors.M2, 0)
    }

    //% subcategory=Motor
    //% blockId=Motorforward block="Forward|speed %speed |interval %interval"
    //% speed eg: 150
    //% weight=100
    //% speed.min=-255 speed.max=255
    //% interval eg: 100
    export function forward(speed: number, interval: number) {
        MotorRun(Motors.M1, speed)
        MotorRun(Motors.M2, speed)
        if(interval == 0)
        {
            return;
        }
        basic.pause(interval)
        stop()
    }

    //% subcategory=Motor
    //% blockId=Motorback block="Back|speed %speed |interval %interval"
    //% speed eg: 150
    //% weight=100
    //% speed.min=-255 speed.max=255
    //% interval eg: 100
    export function back(speed: number, interval: number) {
        MotorRun(Motors.M1, -speed)
        MotorRun(Motors.M2, -speed)
        if (interval == 0) {
            return;
        }
        basic.pause(interval)
        stop()
    }

    //% subcategory=Motor
    //% blockId=Motorleft block="Turn Left|speed %speed |interval %interval"
    //% speed eg: 150
    //% weight=100
    //% speed.min=-255 speed.max=255
    //% interval eg: 100
    export function left(speed: number, interval: number) {
        MotorRun(Motors.M1, speed)
        MotorRun(Motors.M2, -speed)
        if (interval == 0) {
            return;
        }
        basic.pause(interval)
        stop()
    }

    //% subcategory=Motor
    //% blockId=Motorright block="Turn Right|speed %speed |interval %interval"
    //% speed eg: 150
    //% weight=100
    //% speed.min=-255 speed.max=255
    //% interval eg: 100
    export function right(speed: number, interval: number) {
        MotorRun(Motors.M1, -speed)
        MotorRun(Motors.M2, speed)
        if (interval == 0) {
            return;
        }
        basic.pause(interval)
        stop()
    }
}