function findPeakAndTrough(transactions: MonzoTransaction[]): { min: number; max: number } {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (const transaction of transactions) {
        if (transaction.amount > max) {
            max = transaction.amount;
        }

        if (transaction.amount < min) {
            min = transaction.amount;
        }
    }

    return { min, max };
}

function getXFromTransaction(
    index: number,
    transactionsLength: number,
    canvas: HTMLCanvasElement,
): number {
    const fraction = index / transactionsLength;
    const y = fraction * canvas.width;

    return Math.floor(y);
}

function getYFromTransaction(
    transactionAmount: number,
    canvas: HTMLCanvasElement,
    min: number,
    max: number,
): number {
    const distance = Math.abs(min - max);
    const adjustedPrice = transactionAmount - min;
    const fraction = adjustedPrice / distance;
    const x = fraction * canvas.height;

    return Math.floor(x);
}

function cartToScreen(px: number, py: number, canvas: HTMLCanvasElement): { x: number; y: number } {
    return { x: px, y: -py + canvas.height };
}

export default function drawGraph(
    canvas: HTMLCanvasElement,
    transactions: MonzoTransaction[],
): void {
    const ctx = canvas.getContext("2d");
    const { min, max } = findPeakAndTrough(transactions);

    const latsetTransactions = transactions.slice(Math.max(transactions.length - 10, 0)).reverse();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // tslint:disable-next-line:no-any
    let oldXY: any = {};

    for (let i = 0; i < latsetTransactions.length; i++) {
        const transaction = latsetTransactions[i];
        const y = getYFromTransaction(transaction.amount, canvas, min, max);
        const x = getXFromTransaction(i, latsetTransactions.length, canvas);

        const newXY = cartToScreen(x, y, canvas);

        ctx.moveTo(oldXY.x, oldXY.y);
        ctx.lineTo(newXY.x, newXY.y);
        oldXY = newXY;
    }

    ctx.lineTo(canvas.width, canvas.height);

    ctx.strokeStyle = "#fff";
    ctx.stroke();
}
