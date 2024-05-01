// Chart 객체에 넘겨줄 차트에 대한 정보들을 정의한 객체. 명품 html5의 7장 프로토타입 참고
var configTemp = {
        // type은 차트 종류 지정
        type: 'line', /* line 등으로 바꿀 수 있음 */
    
        // data는 차트에 출력될 전체 데이터 표현
        data: {
                // labels는 배열로 데이터의 레이블들
                labels: [],
    
                // datasets 배열로 이 차트에 그려질 모든 데이터 셋 표현. 아래는 그래프 1개만 있는 경우
                datasets: [{
                        label: '온도',
                        backgroundColor: 'yellow',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        data: [], /* 각 레이블에 해당하는 데이터 */
                        fill : false, /* 그래프 아래가 채워진 상태로 그려집니다. 해보세요 */
                },
                {
                    label: '습도',
                    backgroundColor: 'blue',
                    borderColor: 'rgb(100, 99, 132)',
                    borderWidth: 2,
                    data: [], /* 각 레이블에 해당하는 데이터 */
                    fill : false, /* 그래프 아래가 채워진 상태로 그려집니다. 해보세요 */
            }]
        },
    
        //  차트의 속성 지정
        options: {
                responsive : false, // 크기 조절 금지
                scales: { /* x축과 y축 정보 */
                        xAxes: [{
                                display: true,
                                scaleLabel: { display: true, labelString: '시간' },
                        }],
                        yAxes: [{
                                display: true,
                                scaleLabel: { display: true, labelString: '수치' }
                        }]
                }
        }
    };
    
    var configIllumi = {
        // type은 차트 종류 지정
        type: 'line', /* line 등으로 바꿀 수 있음 */
    
        // data는 차트에 출력될 전체 데이터 표현
        data: {
                // labels는 배열로 데이터의 레이블들
                labels: [],
    
                // datasets 배열로 이 차트에 그려질 모든 데이터 셋 표현. 아래는 그래프 1개만 있는 경우
                datasets: [{
                        label: '조도',
                        backgroundColor: 'yellow',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        data: [], /* 각 레이블에 해당하는 데이터 */
                        fill : false, /* 그래프 아래가 채워진 상태로 그려집니다. 해보세요 */
                }]
        },
    
        //  차트의 속성 지정
        options: {
                responsive : false, // 크기 조절 금지
                scales: { /* x축과 y축 정보 */
                        xAxes: [{
                                display: true,
                                scaleLabel: { display: true, labelString: '시간' },
                        }],
                        yAxes: [{
                                display: true,
                                scaleLabel: { display: true, labelString: '수치' }
                        }]
                }
        }
    };
    
    var ctxTemp = null
    var ctxIllumi = null

    var chartTemp = null
    var chartIllumi = null

    var LABEL_SIZE = 20; // 차트에 그려지는 데이터의 개수
    var tick1 = 0; // 도착한 데이터의 개수임, tick의 범위는 0에서 99까지만
    var tick2 = 0;
    var label;

    function drawChartTemp() {
        ctxTemp = document.getElementById('canvasTemp').getContext('2d');
        chartTemp = new Chart(ctxTemp, configTemp);
        initTemp();
    } // end of drawChart()
    

    function drawChartIllumi() {
        ctxIllumi = document.getElementById('canvasillumi').getContext('2d');
        chartIllumi = new Chart(ctxIllumi, configIllumi);
        initIllumi();
    } // end of drawChart()
    
    // chart의 차트에 labels의 크기를 LABEL_SIZE로 만들고 0~19까지 레이블 붙이기
    function initTemp() {
        for(let i=0; i<LABEL_SIZE; i++) {
                chartTemp.data.labels[i] = i;
        }
        chartTemp.update();
    }

    function initIllumi() {
        for(let i=0; i<LABEL_SIZE; i++) {
                chartIllumi.data.labels[i] = i;
        }
        chartIllumi.update();
    }

    function addChartDataIllumi(value) {
        tick1++; // 도착한 데이터의 개수 증가
        tick1 %= 100; // tick의 범위는 0에서 99까지만. 100보다 크면 다시 0부터 시작
        let n = chartIllumi.data.datasets[0].data.length; // 현재 데이터의 개수
        if(n < LABEL_SIZE)
                chartIllumi.data.datasets[0].data.push(value);
        else {
                // 새 데이터 value 삽입
                chartIllumi.data.datasets[0].data.push(value);
                chartIllumi.data.datasets[0].data.shift();
    
                // 레이블 삽입
                chartIllumi.data.labels.push(tick1);
                chartIllumi.data.labels.shift();
        }
        chartIllumi.update();
    }
    
    function addChartDataTemp(label, value) {
        tick2++; // 도착한 데이터의 개수 증가
        tick2 %= 100; // tick의 범위는 0에서 99까지만. 100보다 크면 다시 0부터 시작
        let n1 = chartTemp.data.datasets[label].data.length; // 현재 데이터의 개수
        if(n1 < LABEL_SIZE) {
                chartTemp.data.datasets[label].data.push(value);
        }
        else {
                // 새 데이터 value 삽입
                chartTemp.data.datasets[label].data.push(value);
                chartTemp.data.datasets[label].data.shift();
    
                // 레이블 삽입
                chartTemp.data.labels.push(tick2);
                chartTemp.data.labels.shift();
        }
        chartTemp.update();
    }


    function hideshowCam() { // 캔버스 보이기 숨기기
        if(canvasCam.style.display == "none")  canvasCam.style.display = "block"
        else canvasCam.style.display = "none"
    }
    function hideshowTemp() { // 캔버스 보이기 숨기기
        if(canvasTemp.style.display == "none")  canvasTemp.style.display = "block"
        else canvasTemp.style.display = "none"
    }
    function hideshowIllumi() { // 캔버스 보이기 숨기기
        if(canvasillumi.style.display == "none")  canvasillumi.style.display = "block"
        else canvasillumi.style.display = "none"
    }
    
    window.addEventListener("load", drawChartTemp); // load 이벤트가 발생하면 drawChart() 호출하도록 등록
    window.addEventListener("load", drawChartIllumi); // load 이벤트가 발생하면 drawChart() 호출하도록 등록
    
