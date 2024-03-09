let values = [];
let w = 20;

let states = [];
let start, end, pivot;

function setup() {
    createCanvas(800, 300);
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
        states[i] = -1;
    }
    start = 0;
    end = values.length - 1
    // quickSort(values, start, end);
}

async function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1);
            }
        }
    }
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let mid = await partition(arr, start, end);
    await Promise.all([
        quickSort(arr, start, mid - 1),
        quickSort(arr, mid + 1, end)
    ])
}

async function partition(arr, start, end) {
    let pivot = arr[start];
    let i = start + 1;
    let j = end;

    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await swap(arr, i, j);
            i++;
            j--;
        }
    }
    await swap(arr, start, j);
    return j;
}

async function swap(arr, i, j) {
    await sleep(100);

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function draw() {
    background(51);
    for (let i = 0; i < values.length; i++) {
        if (i === start) {
            states[i] = 0;
        } else if (i === end) {
            states[i] = 1;
        } else if (i === pivot) {
            states[i] = 2;
        } else {
            states[i] = -1;
        }
    }

    for (let i = 0; i < values.length; i++) {
        if (states[i] === 0) {
            fill(255, 0, 0);
        } else if (states[i] === 1) {
            fill(0, 255, 0);
        } else if (states[i] === 2) {
            fill(0, 0, 255);
        } else {
            fill(255);
        }
        stroke(0);
        rect(i * w, height - values[i], w, values[i]);
        // textAlign(CENTER, CENTER);
        // text(values[i], i * w + w / 2, height - values[i] - 10);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('QuickSort').addEventListener('click', async function () {
    // let inputArray = document.getElementById('inputArray').value;
    // values = inputArray.split(',').map(Number);
    await quickSort(values, start, end);
    redraw();
})

document.getElementById('BubbleSort').addEventListener('click', async function () {
    // let inputArray = document.getElementById('inputArray').value;
    // values = inputArray.split(',').map(Number);
    await bubbleSort(values);
    redraw();
})