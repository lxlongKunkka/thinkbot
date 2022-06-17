// 在此处测试；当此软件包作为插件使用时，将不会编译此软件包。
ThinkBox.LED_ON(LEDS.LED0)
ThinkBox.LED_ON(LEDS.LED1)
ThinkBox.LED_ON(LEDS.LED2)
ThinkBox.LED_ON(LEDS.LED3)

basic.forever(function() {
    ThinkBox.LED_TOGGLE(LEDS.LED0)
    ThinkBox.LED_TOGGLE(LEDS.LED1)
    ThinkBox.LED_TOGGLE(LEDS.LED2)
    ThinkBox.LED_TOGGLE(LEDS.LED3)
    basic.pause(500)
})

//music.playMelody("C5 B A G F E D C ", 120)
ThinkBox.LCD_Init()
ThinkBox.LCD_Filling(COLOR.BLUE)
ThinkBox.DisString(0, 0, "0123456789", 0)
ThinkBox.DisString(0, 12, "ABCDEFGHIJKLMN", 0)
ThinkBox.DisString(0, 24, "OPQRSTUVWXYZ", 0)
ThinkBox.DisString(0, 36, "abcdefghijklmn", 0)
ThinkBox.DisString(0, 48, "opqrstuvwxyz", 0)
ThinkBox.DisNumber(0, 60, 1234567890, 0)
ThinkBox.LCD_SetBL(4000)
ThinkBox.DrawPoint(120, 20, 50000, DOT_PIXEL.DOT_PIXEL_4)
ThinkBox.DrawLine(10, 10, 110, 110, 40000, DOT_PIXEL.DOT_PIXEL_2, LINE_STYLE.LINE_SOLID)
ThinkBox.DrawCircle(80, 60, 30, 30000, DRAW_FILL.DRAW_EMPTY, DOT_PIXEL.DOT_PIXEL_1)
let strip = neopixel.create(DigitalPin.P2, 4, NeoPixelMode.RGB)
strip.setBrightness(5)
strip.showRainbow(1, 180)
loops.everyInterval(500, function() {
    strip.rotate()
    strip.show()
})
basic.forever(function() {
    ThinkBox.ListenKeyPad()
    if (ThinkBox.ReadKeyPad(KEY.UP)) 
    {
        ThinkBox.forward(200, 0)
        basic.showArrow(ArrowNames.North)
    }
    else if (ThinkBox.ReadKeyPad(KEY.DOWN))
    {
        ThinkBox.back(200, 0)
        basic.showArrow(ArrowNames.South)
    }
    else if (ThinkBox.ReadKeyPad(KEY.LEFT)) 
    {
        ThinkBox.left(200, 0)
        basic.showArrow(ArrowNames.West)
    }
    else if (ThinkBox.ReadKeyPad(KEY.RIGHT)) 
    {
        ThinkBox.right(200, 0)
        basic.showArrow(ArrowNames.East)
    }
    else if(ThinkBox.ReadKeyPad(KEY.A))
    {
        ThinkBox.stop()
        basic.showIcon(IconNames.Heart)
    }
})

radio.setGroup(1)

let cur = "stop"
radio.onReceivedString(function (receivedString) {
    if (receivedString == "forward") {
        if(cur != "forward")
        {
            ThinkBox.forward(200, 0)
            cur = "forward"
        }
    } else if (receivedString == "back") {
        if(cur != "back")
        {
            ThinkBox.back(200, 0)
            cur = "back"
        }
    } else if (receivedString == "left") {
        if(cur != "left")
        {
            ThinkBox.left(200, 0)
            cur = "left"
        }
    } else if (receivedString == "right") {
        if(cur != "right")
        {
            ThinkBox.right(200, 0)
            cur = "right"
        }
    } else if (receivedString == "stop") {
        if(cur != "stop")
        {
            ThinkBox.stop()
            cur = "stop"
        }
    }
})

basic.forever(function() {
    if (input.buttonIsPressed(Button.A)) 
    {
        ThinkBox.DrawCircle(20, 100, 2, 0xF800, DRAW_FILL.DRAW_FULL, DOT_PIXEL.DOT_PIXEL_1)
    }
    else
    {
        ThinkBox.DrawCircle(20, 100, 2, 0X8430, DRAW_FILL.DRAW_FULL, DOT_PIXEL.DOT_PIXEL_1)
    }
    if (input.buttonIsPressed(Button.B)) {
        ThinkBox.DrawCircle(140, 100, 2, 0xF800, DRAW_FILL.DRAW_FULL, DOT_PIXEL.DOT_PIXEL_1)
    }
    else {
        ThinkBox.DrawCircle(140, 100, 2, 0X8430, DRAW_FILL.DRAW_FULL, DOT_PIXEL.DOT_PIXEL_1)
    }
})

basic.forever(function() {
    let a = [-1, -1, -1, -1];
    a = ThinkBox.ScanAllChannel()
    for(let i=0; i<4; i++)
    {
        a[i] = a[i] / 255 * 3.3
        if(a[i] <= 0.5)
        {
            ThinkBox.DrawCircle(i * 40 + 20, 60, 2, 0X8430, DRAW_FILL.DRAW_FULL, DOT_PIXEL.DOT_PIXEL_1)
        }
        else
        {
            ThinkBox.DrawCircle(i * 40 + 20, 60, 2, 0xF800, DRAW_FILL.DRAW_FULL, DOT_PIXEL.DOT_PIXEL_1)
        }
    }
})