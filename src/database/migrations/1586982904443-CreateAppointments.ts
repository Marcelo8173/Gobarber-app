import {MigrationInterface, QueryRunner, Table, Timestamp} from "typeorm";

export class CreateAppointments1586982904443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // oq vai ser feito no banco
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',//para banco de dados postgres - timestamp para outros bancos
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //metodo que defaz o que eu diz na tabela
        await queryRunner.dropTable('appointments');
    }

}
