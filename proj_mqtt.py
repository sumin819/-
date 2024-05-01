
# publisher

import time
import paho.mqtt.client as mqtt
import myCamera
import proj_circuit

flag = False
btn1 = False
btn2 = False
btn3 = False
ledWStatus = 0

def on_connect(client, userdata, flag, rc):
        client.subscribe("facerecognition", qos=0)
        client.subscribe("ledR", qos=0)
        client.subscribe("ledG", qos=0)

def on_message(client, userdata, msg) :
        global flag
        command=msg.payload.decode("utf-8")
        if command=="action":
            print("action msg received..")
            flag=True
        elif command=="ledR":
            proj_circuit.ledROnOff() 
        elif command=="ledG":
            proj_circuit.ledGOnOff()

broker_ip = "localhost" # 현재 이 컴퓨터를 브로커로 설정

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(broker_ip, 1883)
client.loop_start()

while True :
        client.publish("temp", proj_circuit.getTemperature(), qos=0)
        client.publish("humid", proj_circuit.getHumidity(), qos=0)
        client.publish("illumi",proj_circuit.mcp.read_adc(0), qos=0)

        if flag==True:
            imageFileName = myCamera.takePicture()
            client.publish("image", imageFileName, qos=0)
            flag=False

        if ledWStatus==1:
            proj_circuit.ledOnOff(proj_circuit.ledW, 1)
            ledWStatus=0

        btn1 = proj_circuit.GPIO.input(proj_circuit.button1)
        if btn1==1:
            client.publish("alert", btn1, qos=0)
            btn1=False

        btn2 = proj_circuit.GPIO.input(proj_circuit.button2)
        if btn2==1:
            proj_circuit.ledROff()
            client.publish("timer30", btn2, qos=0)
            btn2=False

        btn3 = proj_circuit.GPIO.input(proj_circuit.button3)
        if btn3==1:
            proj_circuit.ledGOff()
            client.publish("timer5", btn3, qos=0)
            btn3=False


        distance = proj_circuit.measureDistance()
        if(distance>50):
            onOff=0
            proj_circuit.ledOnOff(proj_circuit.ledW, onOff)

        else:
            onOff=1
            proj_circuit.ledOnOff(proj_circuit.ledW, onOff)
        time.sleep(1)


client.loop_stop()
client.disconnect()

