/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import { Context, Pda, PublicKey, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi'
import { Serializer, bytes, mapSerializer, string, struct, u32, u64 } from '@metaplex-foundation/umi/serializers'
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared'

// Accounts.
export type SendInstructionAccounts = {
    peer: PublicKey | Pda
    store: PublicKey | Pda
    endpoint: PublicKey | Pda
}

// Data.
export type SendInstructionData = {
    discriminator: Uint8Array
    dstEid: number
    message: string
    options: Uint8Array
    nativeFee: bigint
    lzTokenFee: bigint
}

export type SendInstructionDataArgs = {
    dstEid: number
    message: string
    options: Uint8Array
    nativeFee: number | bigint
    lzTokenFee: number | bigint
}

export function getSendInstructionDataSerializer(): Serializer<SendInstructionDataArgs, SendInstructionData> {
    return mapSerializer<SendInstructionDataArgs, any, SendInstructionData>(
        struct<SendInstructionData>(
            [
                ['discriminator', bytes({ size: 8 })],
                ['dstEid', u32()],
                ['message', string()],
                ['options', bytes({ size: u32() })],
                ['nativeFee', u64()],
                ['lzTokenFee', u64()],
            ],
            { description: 'SendInstructionData' }
        ),
        (value) => ({
            ...value,
            discriminator: new Uint8Array([102, 251, 20, 187, 65, 75, 12, 69]),
        })
    ) as Serializer<SendInstructionDataArgs, SendInstructionData>
}

// Args.
export type SendInstructionArgs = SendInstructionDataArgs

// Instruction.
export function send(
    context: Pick<Context, 'programs'>,
    input: SendInstructionAccounts & SendInstructionArgs
): TransactionBuilder {
    // Program ID.
    const programId = context.programs.getPublicKey('myOapp', 'HFyiETGKEUS9tr87K1HXmVJHkqQRtw8wShRNTMkKKxay')

    // Accounts.
    const resolvedAccounts = {
        peer: { index: 0, isWritable: false as boolean, value: input.peer ?? null },
        store: {
            index: 1,
            isWritable: false as boolean,
            value: input.store ?? null,
        },
        endpoint: {
            index: 2,
            isWritable: false as boolean,
            value: input.endpoint ?? null,
        },
    } satisfies ResolvedAccountsWithIndices

    // Arguments.
    const resolvedArgs: SendInstructionArgs = { ...input }

    // Accounts in order.
    const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index)

    // Keys and Signers.
    const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId)

    // Data.
    const data = getSendInstructionDataSerializer().serialize(resolvedArgs as SendInstructionDataArgs)

    // Bytes Created On Chain.
    const bytesCreatedOnChain = 0

    return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }])
}
