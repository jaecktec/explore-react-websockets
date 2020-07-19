package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/websocket"
	"strconv"
	"time"
)

func main() {
	r := gin.New()
	r.GET("/ws", func(c *gin.Context) {
		handler := websocket.Handler(EchoServer)
		handler.ServeHTTP(c.Writer, c.Request)
	})
	_ = r.Run("localhost:8081")
}

func EchoServer(conn *websocket.Conn) {
	c := make(chan bool, 1)

	defer func() {
		println("closing connection")
		conn.Close()
		c <- true
	}()
	go func() {
		for {
			var message string
			err := websocket.Message.Receive(conn, &message)
			if err != nil {
				fmt.Println(err)
				c <- true
				break
			}
			println(message)
		}

	}()
	go func() {
		ticker := time.NewTicker(pingPeriod)
		defer func() {
			ticker.Stop()
			conn.Close()
		}()
		i := 0
		for {
			i += 1
			_, err := conn.Write([]byte("hallo " + strconv.Itoa(i)))
			if err != nil {
				fmt.Println(err)
				c <- true
				break
			}
			time.Sleep(10 * time.Millisecond)
		}
	}()
	<- c
}
