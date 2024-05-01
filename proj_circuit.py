import time
import RPi.GPIO as GPIO
from adafruit_htu21d import HTU21D
import busio
import Adafruit_MCP3008

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

trig = 20
echo = 16
GPIO.setup(trig, GPIO.OUT)
GPIO.setup(echo, GPIO.IN)
GPIO.output(trig, False)

sda=2
scl=3
i2c=busio.I2C(scl, sda)
sensor=HTU21D(i2c)
mcp=Adafruit_MCP3008.MCP3008(clk=11, cs=8, miso=9, mosi=10)

ledG=5
ledR=6
ledW=13
GPIO.setup(ledG, GPIO.OUT)
GPIO.setup(ledR, GPIO.OUT)
GPIO.setup(ledW, GPIO.OUT)

button1=21
button2=12
button3=26
GPIO.setup(button1, GPIO.IN, GPIO.PUD_DOWN)
GPIO.setup(button2, GPIO.IN, GPIO.PUD_DOWN)
GPIO.setup(button3, GPIO.IN, GPIO.PUD_DOWN)

def measureDistance():
        global trig, echo
        GPIO.output(trig, True) # 신호 1 발생
        time.sleep(0.00001) # 짧은시간후 0으로 떨어뜨려 falling edge를 만       
        GPIO.output(trig, False) # 신호 0 발생(falling 에지)

        while(GPIO.input(echo) == 0):
                pass
        pulse_start = time.time() # 신호 1. 초음파 발생이 시작되었음을 알림
        while(GPIO.input(echo) == 1):
                pass
        pulse_end = time.time() # 신호 0. 초음파 수신 완료를 알림

        pulse_duration = pulse_end - pulse_start
        return 340*100/2*pulse_duration

def getTemperature():
    return float(sensor.temperature)
def getHumidity():
    return float(sensor.relative_humidity)
def ledOnOff(led, onOff):
    GPIO.output(led, onOff)

def ledROnOff():
    GPIO.output(ledR, 1)
def ledGOnOff():
    GPIO.output(ledG, 1)
def ledROff():
    GPIO.output(ledR, 0)
def ledGOff():
    GPIO.output(ledG, 0)

def button1Pressed(button1):
    return True

def button2Pressed(button2):
    return True
    
def button3Pressed(button3):    
    return True
