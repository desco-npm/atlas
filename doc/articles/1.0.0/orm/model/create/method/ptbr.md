# Definindo Métodos

Todo [Model](#orm.model) já vem com [métodos prontos para uso](#orm.model.method), porém pode acontecer de o desenvolvedor desejar adicionar métodos próprios a um [Model](#orm.model), e isso é perfeitamente possível!

Logo após a criação do [Model](#orm.model) (retornado pelo `Orm.addModel()`) podemos simplesmente pegá-lo e adicionar os métodos desejados que irá funcionar.

**PORÉM** pode ocorrer de o seu método precisar usar outros [Models](#orm.model), por isso é **recomendado** executar esta operação na função da propriedade `pos` passada ao `Orm.addModel()`.

Veja abaixo as duas formas criação:

{<methods>}