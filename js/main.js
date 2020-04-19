$(document).ready(function(){
    $.get("https://coronavirus-tracker-api.herokuapp.com/all", function(resp, status){
        //Günler
        const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

        //Çekilen Datalar
        let confirmed = resp.confirmed.locations['213'].history;
        let deaths = resp.deaths.locations['213'].history
        let recovered = resp.recovered.locations['213'].history


        //Mevcut güne göre tabloları düzenleme
        let last_shared_data_date = Object.keys(confirmed)[Object.keys(confirmed).length-1];
        // console.log(last_shared_data_date);
        let current_data_time = new Date(Date.parse(last_shared_data_date));

        let last_data_day = current_data_time.getDay();
        let current_day = (last_data_day) % 7;
        let last_days_of_week = [ ] ;
        for (let i=0 ; i<7 ; i++) {
            if (i == current_day) {
                console.log(current_day)
                last_days_of_week[i] = days[(current_day+i) % 7] + " (Güncel)";
            } else {
                last_days_of_week[i] = days[(current_day + i) % 7];
            }
        }

        //Confirmed
        let last_week_confirmed = [];
        let each_day_confirmed = [];
        for(let i=0; i<8; i++) {
            last_week_confirmed.push(confirmed[Object.keys(confirmed)[Object.keys(confirmed).length - i -1]]);
        }
        last_week_confirmed = last_week_confirmed.reverse();

        for (i=0; i<7; i++) {
            let each_day_diff = last_week_confirmed[i+1] - last_week_confirmed[i];
            each_day_confirmed.push(each_day_diff);
        }
        last_week_confirmed.shift();

        //Deaths
        let last_week_deaths = [];
        let each_day_deaths = [];
        for(let i=0; i<8; i++) {
            last_week_deaths.push(deaths[Object.keys(deaths)[Object.keys(deaths).length - i -1]]);
        }
        last_week_deaths = last_week_deaths.reverse();

        for (i=0; i<7; i++) {
            let each_day_diff = last_week_deaths[i+1] - last_week_deaths[i];
            each_day_deaths.push(each_day_diff);
        }
        last_week_deaths.shift();

        //Recovered
        let last_week_recovered = [];
        let each_day_recovered = [];
        for(let i=0; i<8; i++) {
            last_week_recovered.push(recovered[Object.keys(recovered)[Object.keys(recovered).length - i -1]]);
        }
        last_week_recovered = last_week_recovered.reverse();

        for (i=0; i<7; i++) {
            let each_day_diff = last_week_recovered[i+1] - last_week_recovered[i];
            each_day_recovered.push(each_day_diff);
        }
        last_week_recovered.shift();

        //Confirmed Cases Number Differences For Each Day
        let last_9_days_cases = [];
        for(let i=0; i<9; i++) {
            last_9_days_cases.push(confirmed[Object.keys(confirmed)[Object.keys(confirmed).length - i -1]]);
        }
        last_9_days_cases = last_9_days_cases.reverse();

        let new_cases_per_day = [];
        for(let i=0; i<8; i++) {
            let new_cases = last_9_days_cases[i+1] - last_9_days_cases[i];
            new_cases_per_day.push(new_cases);
        }

        let day_diffs = [];
        for (let i=0; i<7; i++) {
            let diff = new_cases_per_day[i+1] - new_cases_per_day[i];
            day_diffs.push(diff);
        }

        //Confirmed Chart Data
        var data_1 = {
            name: "graph-1",
            labels: last_days_of_week,
            datasets: [
                {
                    label: "Toplam Vaka",
                    backgroundColor: "rgba(255,97,136,0.2)",
                    borderColor: "rgba(255,97,136,1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255,97,136,0.4)",
                    hoverBorderColor: "rgba(255,97,136,0.2)",
                    data: last_week_confirmed,
                }]
        };

        //Death Chart Data
        var data_2 = {
            name: "graph-2",
            labels: last_days_of_week,
            datasets: [
                {
                    label: "Toplam Vefat",
                    // hidden: true,
                    backgroundColor: "rgba(255,97,136,0.2)",
                    borderColor: "rgba(255,97,136,1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255,97,136,0.4)",
                    hoverBorderColor: "rgba(255,97,136,0.2)",
                    data: last_week_deaths,
                }]
        };

        //Recovered Chart Data
        var data_3 = {
            name: "graph-3",
            labels: last_days_of_week,
            datasets: [
                {
                    label: "Toplam İyileşen",
                    // hidden: true,
                    backgroundColor: "rgba(255,97,136,0.2)",
                    borderColor: "rgba(255,97,136,1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255,97,136,0.4)",
                    hoverBorderColor: "rgba(255,97,136,0.2)",
                    data: last_week_recovered,
                }]
        };

        //Confirmed Case Differences For Each Day Data
        var data_4 = {
            name: "graph-4",
            labels: last_days_of_week,
            datasets: [
                {
                    label: "Bir Önceki Güne Göre Vaka Sayısındaki Değişim",
                    // hidden: true,
                    backgroundColor: "rgba(255,97,136,0.2)",
                    borderColor: "rgba(255,97,136,1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255,97,136,0.4)",
                    hoverBorderColor: "rgba(255,97,136,0.2)",
                    data: day_diffs,
                }]
        };

        //each_day_confirmed
        var options = {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,97,136,0.2)"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) {
                        let tooltip_array = [];
                        if (data.name == "graph-1") {
                            tooltip_array = each_day_confirmed
                        } else if (data.name == "graph-2") {
                            tooltip_array = each_day_deaths
                        } else {
                            tooltip_array = each_day_recovered
                        }
                        var customTooltip = [tooltipItems.yLabel];
                        customTooltip.push('Gün içinde toplam: ' + tooltip_array[tooltipItems.index]);

                        return customTooltip;
                    }
                }
            },
            legend: {
                onClick: function(e, legendItem) {
                    //TODO
                },
            },
        };

        var options_4 = {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,97,136,0.2)"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                onClick: function(e, legendItem) {
                    //TODO
                },
            },
        };

        myChart_1 = Chart.Bar('chart-1', {
            options: options,
            data: data_1
        });

        myChart_2 = Chart.Bar('chart-2', {
            options: options,
            data: data_2
        });

        myChart_3 = Chart.Bar('chart-3', {
            options: options,
            data: data_3
        });

        myChart_4 = Chart.Bar('chart-4', {
            options: options_4,
            data: data_4
        });
    });
});