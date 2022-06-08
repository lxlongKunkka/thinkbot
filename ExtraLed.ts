enum LEDS {
    LED0 = 0,
    LED1,
    LED2,
    LED3,
}

namespace ThinkBox{
    let led_state: number[] = [0, 0, 0, 0];
    
    //% subcategory=ExtraLed
    //% blockId=ExtraLed block="LED|led %led ON"
    //% weight=100
    export function LED_ON(led: LEDS) {
        if (led <= 2) {
            SetLED(led, true)
        }
        else {
            DAC(255)
        }
        led_state[led] = 1;
    }

    //% subcategory=ExtraLed
    //% blockId=ExtraLed block="LED|led %led OFF"
    //% weight=100
    export function LED_OFF(led: LEDS) {
        if (led <= 2) {
            SetLED(led, false)
        }
        else {
            DAC(0)
        }
        led_state[led] = 0;
    }

    //% subcategory=ExtraLed
    //% blockId=ExtraLed block="LED|led %led TOGGLE"
    //% weight=100
    export function LED_TOGGLE(led: LEDS) {
        if (led_state[led]) {
            LED_OFF(led)
        }
        else {
            LED_ON(led)
        }
    }
}