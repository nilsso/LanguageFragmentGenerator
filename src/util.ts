export function random_index<T>(arr: Array<T>): number {
    console.assert(arr.length > 0);
    return Math.floor(Math.random() * arr.length);
}

export function random_element<T>(arr: Array<T>): T {
    return arr[random_index(arr)];
}

export function remove_random<T>(arr: Array<T>): T | undefined {
    let i = random_index(arr);
    return arr.splice(i, 1).pop();
}

export function clone_reg_exp(input: RegExp, injectFlags: string) {
    let pattern = input.source;
    let flags = "";
    injectFlags = (injectFlags || "");

    if (input.global || ( /g/i ).test(injectFlags) ) { flags += "g"; }
    if (input.ignoreCase || ( /i/i ).test(injectFlags) ) { flags += "i"; }
    if (input.multiline || ( /m/i ).test(injectFlags) ) { flags += "m"; }

    return(new RegExp(pattern, flags));
}

export function unzip<A, B>(arr: Array<[A, B]>): [Array<A>, Array<B>] {
    //let unzipped = [...arr[0]].map((_, i) => arr.map(row => row[i]));
    //return [unzipped[0], unzipped[1]];
    let a: Array<A> = [];
    let b: Array<B> = [];
    for (let [u, v] of arr) {
        a.push(u);
        b.push(v);
    }
    return [a, b];
}

export function mask(length: number, fill: boolean): Array<boolean> {
    return Array(length).fill(fill);
}

export function toggle_mask(mask: Array<boolean>, i: number, value: boolean): Array<boolean> {
    let res = [...mask];
    res[i] = value;
    return res;
}

