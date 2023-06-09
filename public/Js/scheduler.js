function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] <= target) {
            result = mid; // Update the result to the current index
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

class Scheduler {
    constructor(scheduleURL) {
        this.scheduleURL = scheduleURL;
        this.vdsos = [];
        this.scheduleOrder = -1; // helps to avoid resending the already sent schedules.
        // Server will send schedule with scheduleOrder, which will change per schedule and group devices
    }

    addVDSO = (vdso) => {
        this.vdsos.push({
            vdso: vdso,
            url:vdso.display.material.diffuseTexture.video.src,
        }); // Append vdso
        return (this.vdsos.length - 1);
    }

    getVdsos = () => {
        return this.vdsos;
    }

    getSchedule = (url = "") => {
        if (url != "") {
            this.scheduleURL = url;
        }
        axios.get('http://localhost:8000/provideSchedule', {
            params:{
                vdsoList:[1,2,3,4]
            }
        })
        .then(response => {
            console.log(response);
            console.log(this.vdsos);
        })
        // fetch()
        //     .then(response => response.json())
        //     .then(data => {
        //         // Process the fetched data
        //         console.log(data);
        //         /*
        //         scheduleOrder:no,
        //         schedule:{
        //             timings:[ordered, array]
        //             urls:{
        //                 time: URL // time will be same from timings function
        //             }
        //         }
        //         devices:[] // list of device IDs
        //         */
        //         if(data.scheduleOrder != this.scheduleOrder)
        //         {
        //             this.scheduleOrder = data.scheduleOrder;
        //         }
        //         // Else already received schedule
        //     })
        //     .catch(error => {
        //         // Handle any errors that occur during the fetch
        //         console.error(error);
        //     });
    }

}