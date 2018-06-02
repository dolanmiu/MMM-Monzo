interface IMonzoTransactionExtended extends MonzoTransaction {
    balanceAtPoint: number;
}

function findPeakAndTrough(
    transactions: IMonzoTransactionExtended[],
): { min: number; max: number } {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (const transaction of transactions) {
        if (transaction.balanceAtPoint > max) {
            max = transaction.balanceAtPoint;
        }

        if (transaction.balanceAtPoint < min) {
            min = transaction.balanceAtPoint;
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

function addBalanceToTransactions(
    transactions: MonzoTransaction[],
    balance: number,
): IMonzoTransactionExtended[] {
    let currentBalance = balance;
    const output: IMonzoTransactionExtended[] = [];

    transactions = transactions.reverse();

    for (const transaction of transactions) {
        const newTransaction = {
            ...transaction,
            balanceAtPoint: currentBalance,
        };

        currentBalance -= transaction.amount;

        output.push(newTransaction);
    }

    return output.reverse();
}

export default function drawGraph(
    canvas: HTMLCanvasElement,
    transactions: MonzoTransaction[],
    balance: number,
): void {
    const ctx = canvas.getContext("2d");
    const latestTransactions = addBalanceToTransactions(transactions, balance);
    const { min, max } = findPeakAndTrough(latestTransactions);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // tslint:disable-next-line:no-any
    let oldXY: any = {};

    for (let i = 0; i < latestTransactions.length; i++) {
        const transaction = latestTransactions[i];
        const y = getYFromTransaction(transaction.balanceAtPoint, canvas, min, max);
        const x = getXFromTransaction(i, latestTransactions.length, canvas);

        const newXY = cartToScreen(x, y, canvas);

        ctx.moveTo(oldXY.x, oldXY.y);
        ctx.lineTo(newXY.x, newXY.y);
        oldXY = newXY;
    }

    ctx.lineTo(canvas.width, canvas.height);

    ctx.strokeStyle = "#fff";
    ctx.stroke();
}
